// Demo: app SAP Fiori de Montera (distribuidora ficticia) para aprobar pedidos de compra.
// Hecha con OpenUI5 (la librería de Fiori) y el tema Horizon adaptado a rojo.
//   /opt/homebrew/bin/node demos/fiori/build.mjs
// Salida: demos/fiori/out/index.html y demos/capturas/fiori/*.png
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'out');
const PNG = resolve(HERE, '../capturas/fiori');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UI5 = 'https://sdk.openui5.org/1.136.4/resources/sap-ui-core.js';
mkdirSync(OUT, { recursive: true });
mkdirSync(PNG, { recursive: true });

const orders = [
  { id: '4500012873', supplier: 'Dehesa Los Arenales, S.L.', amount: '12.480,00', date: '05.10.2026', group: 'Cárnicos', items: 5, urgent: true },
  { id: '4500012874', supplier: 'Quesería Valle del Jerte', amount: '3.215,40', date: '05.10.2026', group: 'Lácteos', items: 3 },
  { id: '4500012875', supplier: 'Conservas Atlántico, S.A.', amount: '5.902,10', date: '04.10.2026', group: 'Conservas', items: 8 },
  { id: '4500012876', supplier: 'Embutidos Sierra de Gata', amount: '8.740,00', date: '04.10.2026', group: 'Cárnicos', items: 6 },
  { id: '4500012877', supplier: 'Envases y Embalajes del Sur', amount: '1.268,90', date: '03.10.2026', group: 'Material', items: 4 },
  { id: '4500012878', supplier: 'Transportes Frío Ibérico', amount: '2.450,00', date: '02.10.2026', group: 'Servicios', items: 1 },
  { id: '4500012879', supplier: 'Aceites Tierra de Barros', amount: '4.380,00', date: '02.10.2026', group: 'Aceites', items: 2 },
];
const items = [
  { pos: '10', material: 'Jamón de cebo ibérico 50 %', code: 'MAT-10021', qty: '320 kg', price: '15,60 €/kg', total: '4.992,00 €' },
  { pos: '20', material: 'Paleta de cebo ibérica 50 %', code: 'MAT-10022', qty: '260 kg', price: '12,80 €/kg', total: '3.328,00 €' },
  { pos: '30', material: 'Lomo de cebo ibérico', code: 'MAT-10031', qty: '80 kg', price: '21,50 €/kg', total: '1.720,00 €' },
  { pos: '40', material: 'Chorizo ibérico de vela 250 g', code: 'MAT-10045', qty: '600 ud.', price: '2,40 €/ud.', total: '1.440,00 €' },
  { pos: '50', material: 'Loncheado de jamón de cebo 100 g', code: 'MAT-10052', qty: '500 ud.', price: '2,00 €/ud.', total: '1.000,00 €' },
];

// Logo de Montera para la barra de Fiori.
const logo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#c8102e"/><path d="M14 46V20l18 16 18-16v26" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  );

const view = `
<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:f="sap.f" xmlns:core="sap.ui.core" displayBlock="true" height="100%">
  <Page id="root" showHeader="false" enableScrolling="false">
    <f:ShellBar title="Aprobar pedidos de compra" secondTitle="Montera Distribución" homeIcon="${logo}" showNotifications="true" notificationsNumber="3" showProductSwitcher="true">
      <f:profile><Avatar initials="MR" backgroundColor="Accent6"/></f:profile>
      <f:searchManager><f:SearchManager placeholder="Buscar"/></f:searchManager>
    </f:ShellBar>
    <SplitApp id="split" class="app-split" mode="ShowHideMode">
      <masterPages>
        <Page title="Pendientes ({/pending})">
          <subHeader><OverflowToolbar><SearchField placeholder="Buscar pedido o proveedor" width="100%"/></OverflowToolbar></subHeader>
          <List id="list" mode="SingleSelectMaster" items="{/orders}" growing="false">
            <ObjectListItem title="{supplier}" number="{amount}" numberUnit="EUR" type="Navigation" selected="{sel}" highlight="{= \${done} ? 'Success' : (\${urgent} ? 'Warning' : 'None') }">
              <attributes>
                <ObjectAttribute text="Pedido {id}"/>
                <ObjectAttribute text="{group} · {items} posiciones"/>
              </attributes>
              <firstStatus><ObjectStatus text="{= \${done} ? 'Aprobado' : (\${urgent} ? 'Urgente' : 'Pendiente') }" state="{= \${done} ? 'Success' : (\${urgent} ? 'Warning' : 'None') }"/></firstStatus>
              <secondStatus><ObjectStatus text="{date}"/></secondStatus>
            </ObjectListItem>
          </List>
          <footer><OverflowToolbar><ToolbarSpacer/><Button icon="sap-icon://sort" type="Transparent"/><Button icon="sap-icon://filter" type="Transparent"/></OverflowToolbar></footer>
        </Page>
      </masterPages>
      <detailPages>
        <Page title="Pedido de compra 4500012873" showNavButton="{device>/system/phone}">
          <content>
            <MessageStrip visible="{/approved}" type="Success" showIcon="true" class="sapUiSmallMargin"
              text="Has aprobado el pedido 4500012873. Se ha notificado a Lucía Gómez (Compras) y se ha enviado al proveedor."/>
            <ObjectHeader title="Dehesa Los Arenales, S.L." number="12.480,00" numberUnit="EUR" responsive="true" backgroundDesign="Solid">
              <attributes>
                <ObjectAttribute title="Solicitado por" text="Lucía Gómez (Compras)"/>
                <ObjectAttribute title="Centro" text="Almacén Cáceres (1010)"/>
                <ObjectAttribute title="Entrega prevista" text="15.10.2026"/>
                <ObjectAttribute title="Condiciones de pago" text="30 días fecha factura"/>
              </attributes>
              <statuses>
                <ObjectStatus title="Estado" text="{= \${/approved} ? 'Aprobado' : 'Pendiente de aprobación' }" state="{= \${/approved} ? 'Success' : 'Warning' }" inverted="true"/>
                <ObjectStatus title="Presupuesto" text="Dentro de presupuesto (78 %)" state="Success" icon="sap-icon://accept"/>
              </statuses>
            </ObjectHeader>
            <IconTabBar expandable="false" class="sapUiResponsiveContentPadding" selectedKey="pos">
              <items>
                <IconTabFilter key="pos" text="Posiciones" count="5">
                  <Table items="{/items}" inset="false" alternateRowColors="false">
                    <headerToolbar><OverflowToolbar><Title text="Posiciones (5)" level="H3"/><ToolbarSpacer/><Button icon="sap-icon://excel-attachment" text="Exportar" type="Transparent"/></OverflowToolbar></headerToolbar>
                    <columns>
                      <Column width="4rem"><Text text="Pos."/></Column>
                      <Column><Text text="Material"/></Column>
                      <Column minScreenWidth="Tablet" demandPopin="true" hAlign="End"><Text text="Cantidad"/></Column>
                      <Column minScreenWidth="Tablet" demandPopin="true" hAlign="End"><Text text="Precio neto"/></Column>
                      <Column hAlign="End"><Text text="Importe"/></Column>
                    </columns>
                    <items>
                      <ColumnListItem>
                        <cells>
                          <Text text="{pos}"/>
                          <ObjectIdentifier title="{material}" text="{code}"/>
                          <Text text="{qty}"/>
                          <Text text="{price}"/>
                          <ObjectNumber number="{total}" emphasized="true"/>
                        </cells>
                      </ColumnListItem>
                    </items>
                  </Table>
                </IconTabFilter>
                <IconTabFilter key="notes" text="Notas" count="1"/>
                <IconTabFilter key="att" text="Adjuntos" count="2"/>
                <IconTabFilter key="flow" text="Flujo de aprobación"/>
              </items>
            </IconTabBar>
          </content>
          <footer>
            <OverflowToolbar>
              <ToolbarSpacer/>
              <Button text="Aprobar" type="Accept" enabled="{= !\${/approved} }"/>
              <Button text="Rechazar" type="Reject" enabled="{= !\${/approved} }"/>
              <Button text="Reenviar" type="Transparent"/>
            </OverflowToolbar>
          </footer>
        </Page>
      </detailPages>
    </SplitApp>
  </Page>
</mvc:View>`;

// Tema Horizon con el rojo de Montera (lo que haría el cliente con el Theme Designer de SAP).
const themeCss = `
html:root {
  --sapBrandColor: #c8102e; --sapHighlightColor: #c8102e; --sapSelectedColor: #c8102e; --sapActiveColor: #a50d26;
  --sapLinkColor: #b00d29; --sapContent_Selected_ForegroundColor: #c8102e; --sapContent_FocusColor: #c8102e;
  --sapButton_Emphasized_Background: #c8102e; --sapButton_Emphasized_BorderColor: #c8102e; --sapButton_Emphasized_Hover_Background: #a50d26;
  --sapList_SelectionBackgroundColor: #fdecee; --sapList_SelectionBorderColor: #c8102e; --sapList_Hover_SelectionBackground: #fbdfe3;
  --sapShell_InteractiveTextColor: #c8102e; --sapShell_Navigation_SelectedColor: #c8102e; --sapShell_SubBrand_TextColor: #1c1b1f;
  --sapTab_Selected_TextColor: #c8102e; --sapTab_Selected_IconColor: #c8102e; --sapTab_Selected_Background: #c8102e;
  --sapButton_Lite_TextColor: #c8102e; --sapButton_Selected_TextColor: #c8102e; --sapButton_Selected_BorderColor: #c8102e;
  --sapContent_Selected_TextColor: #c8102e; --sapLink_Hover_Color: #8e0b20; --sapLink_Active_Color: #8e0b20;
  --sapField_Focus_BorderColor: #c8102e; --sapField_Active_BorderColor: #c8102e; --sapButton_Emphasized_TextColor: #fff;
}
/* Avatar del usuario con los colores de la marca. */
.sapFShellBar .sapMAvatar, .sapFShellBar .sapFAvatar { background-color: #fdecee !important; color: #c8102e !important; }
.sapFShellBar .sapMAvatar *, .sapFShellBar .sapFAvatar * { color: #c8102e !important; }
html, body { height: 100%; margin: 0; }
.app-split { height: calc(100% - 3.25rem) !important; }
/* La cabecera recorta la parte baja del importe y la coma decimal parece un punto. */
.sapMOHR .sapMObjectNumber, .sapMOHR .sapMObjectNumberInner, .sapMOHR .sapMObjectNumberText { overflow: visible !important; }
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Aprobar pedidos de compra · Montera</title>
<script id="sap-ui-bootstrap" src="${UI5}" data-sap-ui-theme="sap_horizon" data-sap-ui-language="es"
  data-sap-ui-libs="sap.m,sap.f" data-sap-ui-xx-css-variables="true" data-sap-ui-compat-version="edge" data-sap-ui-async="true"></script>
<style>${themeCss}</style>
</head><body class="sapUiBody" id="content">
<script id="view" type="text/xml">${view}</script>
<script>
sap.ui.require(['sap/ui/core/mvc/XMLView', 'sap/ui/model/json/JSONModel', 'sap/ui/Device', 'sap/m/Dialog', 'sap/m/Button', 'sap/m/Text', 'sap/m/TextArea', 'sap/m/VBox', 'sap/m/Label'],
  (XMLView, JSONModel, Device, Dialog, Button, Text, TextArea, VBox, Label) => {
  // Estado de la captura: 1 detalle · 2 diálogo de aprobación · 3 aprobado
  const state = Number(new URLSearchParams(location.search).get('state') || 1);
  const orders = ${JSON.stringify(orders)}.map((o, i) => ({ ...o, sel: i === 0, done: state === 3 && i === 0 }));
  const model = new JSONModel({ orders, items: ${JSON.stringify(items)}, approved: state === 3, pending: state === 3 ? 6 : 7 });
  XMLView.create({ definition: document.getElementById('view').textContent }).then((v) => {
    v.setModel(model);
    v.setModel(new JSONModel(Device), 'device');
    v.placeAt('content');
    // Sin anillo de foco en las capturas.
    setTimeout(() => document.activeElement && document.activeElement.blur(), 250);
    if (state === 2) {
      setTimeout(() => new Dialog({
        title: 'Aprobar pedido 4500012873', type: 'Message', state: 'None', contentWidth: '28rem',
        content: new VBox({ items: [
          new Text({ text: '¿Quieres aprobar el pedido de Dehesa Los Arenales, S.L. por 12.480,00 EUR?' }),
          new Label({ text: 'Nota para el solicitante (opcional)', labelFor: 'note' }).addStyleClass('sapUiSmallMarginTop'),
          new TextArea('note', { width: '100%', rows: 3, value: 'Conforme. Pedid al proveedor que la entrega se haga en dos descargas.' }),
        ] }),
        beginButton: new Button({ text: 'Aprobar', type: 'Emphasized' }),
        endButton: new Button({ text: 'Cancelar' }),
      }).open(), 300);
    }
  });
});
</script>
</body></html>`;

const file = join(OUT, 'index.html');
writeFileSync(file, html);

const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const shot = (url, png, w, h, scale, extra = []) =>
  execFileSync(CHROME, [
    ...extra, '--headless=new', '--default-background-color=00000000', '--lang=es-ES', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, '--virtual-time-budget=20000',
    `--screenshot=${png}`, url,
  ], { stdio: 'ignore' });

for (const [name, state] of [['1-detalle', 1], ['2-aprobar', 2], ['3-aprobado', 3]]) {
  shot(`file://${file}?state=${state}`, join(PNG, `${name}.png`), 1440, 900, 2);
  console.log(`✔ ${name}.png`);
}
// En el móvil Fiori muestra primero la lista de pedidos.
// Se carga dentro de un marco de 390 px con un navegador de iPhone, para que Fiori use su vista de móvil.
const phone = join(OUT, 'movil.html');
const statusBar = `<div style="height:50px;display:flex;align-items:center;justify-content:space-between;padding:12px 30px 0 36px;box-sizing:border-box;font:600 16px -apple-system,sans-serif;color:#131e29;background:#fff">
  <span>9:41</span>
  <span style="display:flex;gap:6px;align-items:center">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.6c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8.5.9 10.2 10.2 0 0 0 1.3 3.8L2.5 5a8.5 8.5 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.2a6.8 6.8 0 0 0-9.6 0l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8.5 11.2 7.2 9.9c.3-.3.8-.5 1.3-.5Z"/></svg>
    <span style="width:26px;height:12px;border:1.5px solid currentColor;border-radius:4px;padding:1.5px;box-sizing:border-box;display:inline-block"><i style="display:block;height:100%;width:78%;background:currentColor;border-radius:1.5px"></i></span>
  </span>
</div>`;
writeFileSync(phone, `<!doctype html><html><body style="margin:0;width:390px;height:844px;overflow:hidden;background:#fff">${statusBar}<iframe src="index.html?state=1&phone=1" style="border:0;width:390px;height:794px;display:block"></iframe></body></html>`);
shot(`file://${phone}`, join(PNG, '4-movil.png'), 390, 844, 3, [`--user-agent=${IPHONE_UA}`]);
console.log('✔ 4-movil.png');

// Composición para la web: portátil con la app y el móvil delante.
const montage = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:2000px;height:1250px;overflow:hidden;background:transparent}
.laptop{position:absolute;left:40px;top:40px;width:1620px}
.lid{background:linear-gradient(160deg,#2b2b2e,#0d0d0f);border-radius:34px 34px 0 0;padding:26px 26px 30px;box-shadow:0 0 0 2px #4a4a4e inset}
.lid img{display:block;width:100%;border-radius:8px}
.base{height:34px;margin:0 -70px;background:linear-gradient(#d9d9dc,#a9a9ae);border-radius:0 0 26px 26px;position:relative;box-shadow:0 40px 60px -30px rgb(0 0 0 / .5)}
.base::before{content:"";position:absolute;left:50%;top:0;transform:translateX(-50%);width:240px;height:12px;background:#9a9aa0;border-radius:0 0 12px 12px}
.phone{position:absolute;right:46px;bottom:36px;width:390px;height:844px;padding:14px;border-radius:66px;background:linear-gradient(145deg,#3a3a3c,#111 40%,#2c2c2e);box-shadow:0 0 0 2px #59595c inset,0 40px 80px -30px rgb(0 0 0 / .6)}
.glass{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;background:#fff}
.glass img{display:block;width:100%;height:100%;object-fit:cover}
.island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:20px;background:#000}
</style></head><body>
<div class="laptop"><div class="lid"><img src="file://${join(PNG, '1-detalle.png')}"></div><div class="base"></div></div>
<div class="phone"><div class="glass"><img src="file://${join(PNG, '4-movil.png')}"><span class="island"></span></div></div>
</body></html>`;
const mfile = join(OUT, 'montaje.html');
writeFileSync(mfile, montage);
shot(`file://${mfile}`, join(PNG, 'montaje.png'), 2000, 1250, 1);
console.log('✔ montaje.png');
