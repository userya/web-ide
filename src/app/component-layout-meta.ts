let components = {
  layout: {
    xtype: 'layout',
    label: 'Layout',
    icon: '',
    defaultConfig: {
      type: 'layout'
    }
  },
  row: {
    xtype: 'row',
    label: 'Columns',
    icon: 'columns',
    defaultConfig: {
      type: 'row',
      items: [{
        type: 'col'
      }, {
        type: 'col'
      }]
    }
  },
  col: {
    xtype: 'col',
    label: 'Column',
    icon: 'column',
    defaultConfig: {
      type: 'col'
    }
  },
  div: {
    xtype: 'div',
    label: 'Div',
    icon: 'div',
    defaultConfig: {
      type: 'div'
    }
  },
  text: {
    xtype: 'text',
    label: 'Text',
    icon: 'text',
    defaultConfig: {
      type: 'text'
    }
  }
}

let layout = [
  {
    groupName: 'layout',
    open: true,
    components: [components.row, components.div]
  },
  {
    groupName: 'content',
    open: true,
    components: [components.text]
  }
];


export class ComponentLayoutMeta {


  getComponents():any[] {
    return layout;
  }


}
