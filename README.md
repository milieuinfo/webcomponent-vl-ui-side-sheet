# webcomponent-vl-ui-side-sheet
Side-sheet zijn containers die aan de linker- of rechterrand van het scherm zijn verankerd.

Dit element volgt de regel van [Material Design](https://material.io/components/sheet-side/#theming).

## Installation
```
npm install --save vl-ui-side-sheet
```

## Demo
```
npm run demo
```

## <a name="gebruik"></a>Gebruik
```
      <button is="vl-button" onclick="document.querySelector('#side-sheet-1').open()">Open</button>
      <vl-side-sheet id="side-sheet-1" ... >
        <.... > Content</...>
      </vl-side-sheet>
```

## Kanttekening
- Het side-sheet element heeft 1 slot voor content.
- De default positie van het element is rechts.

## Credits
Zie de lijst van [ontwikkelaars](https://github.com/milieuinfo/webcomponent-vl-ui-side-sheet/graphs/contributors) die meegewerkt hebben aan de webcomponent.

"Detecting a swipe (left, right, top or down) using touch": https://codepen.io/ganmahmud/pen/RaoKZa

## Contact
Mail je suggesties, opmerkingen of tips naar [help@omgevingvlaanderen.be](mailto:help@omgevingvlaanderen.be)
