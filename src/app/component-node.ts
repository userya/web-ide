import {v4 as uuid} from 'uuid';
import {UndoRedo} from "./undo-redo";
import {Cmd} from "./undo-redo-cmd";
import {CmdType} from "./undo-redo-cmd-type";

export class ComponentNode {

  private id:string;
  private type:string;
  private config:any;
  private attribute:any;
  private items:ComponentNode[];
  private parent:ComponentNode;
  private selected:boolean;

  mouseOverFlag:boolean = false;
  mouseOverTOP:boolean = false;
  isPreAdd:boolean = false;
  open:boolean = false;
  accept:boolean = false;


  selectedComponentNode:ComponentNode;
  preAddComponentNode:ComponentNode;

  mouseOverComponentNode:ComponentNode;

  contextMenuComponentNode:ComponentNode;
  contextMenuLocation:{};

  undoRedo:UndoRedo = new UndoRedo();


  toJSONObject():{} {
    var items = [];
    for (var i = 0; i < this.items.length; i++) {
      items.push(this.items[i].toJSONObject());
    }

    let result = {
      id: this.id,
      type: this.type,
      config: this.config,
      attribute: this.attribute,
      items: items
    }
    return result;
  }

  constructor(options:{
    id?:string,
    type?:string,
    config?:{},
    attribute?:{},
    items?:any[],
  } = {}) {
    this.id = options.id || uuid();
    this.type = options.type || '';
    this.config = options.config || {};
    this.attribute = options.attribute || {};
    this.items = [];
    if (options.items) {
      for (var i = 0; i < options.items.length; i++) {
        var conf = options.items[i];
        var node = new ComponentNode(conf);
        node.parent = this;
        this.items.push(node);
      }
    }
  }

  addComponent(parentId:string, config:{}, index:number, setUndoRedo:boolean):void {
    let parent:ComponentNode = this.findById(parentId);
    if (parent) {
      let add = new ComponentNode(config);
      add.parent = parent;

      if (setUndoRedo) {
        this.undoRedo.addCommand(new Cmd(CmdType.ADD, {
          undo: {
            id: config['id']
          },
          redo: {
            parentId: parentId,
            config: config,
            index: index
          }
        }));
      }
      parent.items.splice(index, 0, add);
    }
  }

  updateComponentConfig(id:string, config:{}, setUndoRedo:boolean):void {
    let find:ComponentNode = this.findById(id);
    if (find) {
      if (setUndoRedo) {
        this.undoRedo.addCommand(new Cmd(CmdType.UPDATE, {
          undo: {
            id: config['id'],
            config: find.toJSONObject()
          },
          redo: {
            id: id,
            config: config
          }
        }));
      }

      // let beforeConfig = find.toJSONObject();
      find.updateConfig(config);
      // let afterConfig = find.toJSONObject();

    }
  }


  removeComponent(id:string, setUndoRedo:boolean):void {
    let find = this.findById(id);
    if (!find) {
      return;
    }
    let index:number = null;
    for (var i = 0; i < find.getParent().items.length; i++) {
      if (find.getParent().items[i].getId() == id) {
        index = i;
        break;
      }
    }
    if (index != null) {
      if (setUndoRedo) {
        this.undoRedo.addCommand(new Cmd(CmdType.DELETE, {
          undo: {
            // add
            parentId: find.getParent().getId(),
            config: find.toJSONObject(),
            index: find.getParent().getIndex(id)
          },
          redo: {
            id: id // delete id
          }
        }));
      }
      find.getParent().items.splice(index, 1);
    }
  }

  moveComponent(containerId:string, toAddId:string, index:number, setUndoRedo:boolean):void {
    let config = this.findById(toAddId);
    let container = this.findById(containerId);
    let pos = container.getIndex(toAddId);
    let indexCal = index;
    if (pos != null) {
      // console.log('zunei');
      if (pos < index) {
        indexCal = index - 1;
      }
    }
    if (setUndoRedo) {
      this.undoRedo.addCommand(new Cmd(CmdType.MOVE, {
        undo: {
          containerId: config.getParent().getId(),
          toAddId: toAddId,
          index: config.getParent().getIndex(toAddId)
        },
        redo: {
          containerId: containerId,
          toAddId: toAddId,
          index: index
        }
      }));
    }
    this.removeComponent(toAddId, false);
    this.addComponent(containerId, config.toJSONObject(), indexCal, false);
  }

  updateConfig(config:{}):void {
    if (config) {
      for (var key in config) {
        if (key == 'id') {
          this.id = config[key];
        } else {
          this.config[key] = config[key];
        }
      }
    }
  }

  getIndex(id:string):number {
    let result = null;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].getId() == id) {
        result = i;
        break;
      }
    }
    return result;
  }

  setPreAdd(config:{}):void {
    if (this.preAddComponentNode) {
      this.preAddComponentNode.isPreAdd = false;
    }
    this.preAddComponentNode = new ComponentNode(config);
  }

  setPreAddWidthId(id:string):void {
    let find = this.findById(id);
    if (!find) {
      return;
    }
    if (this.preAddComponentNode) {
      this.preAddComponentNode.isPreAdd = false;
    }
    this.preAddComponentNode = find;
    find.isPreAdd = true;
  }

  clearPreAdd(id:string):void {
    if (this.preAddComponentNode) {
      this.preAddComponentNode.isPreAdd = false;
    }
    this.preAddComponentNode = null;
    // console.log('clear preAdd', this.preAddComponentNode);
  }

  setIsAccept(id:string, accept:boolean):void {
    if (this.mouseOverComponentNode && this.mouseOverComponentNode.getId() == id) {
      this.mouseOverComponentNode.accept = accept;
    }
  }

  setTargetElementWidthId(id:string, direction:{}):void {
    this.setMouseOver(id, direction['isTop']);
  }

  setContextMenu(id:string, location:{}):void {
    let find = this.findById(id);
    if (!find) {
      return;
    }
    this.contextMenuComponentNode = find;
    this.contextMenuLocation = location;
  }

  clearContextMenu() {
    if (this.contextMenuComponentNode != null) {
      this.contextMenuComponentNode = null;
    }
  }

  setMouseOver(id:string, mouseOverTOP:boolean):void {
    let find = this.findById(id);
    if (!find) {
      return;
    }
    if (this.mouseOverComponentNode) {
      this.mouseOverComponentNode.mouseOverFlag = false;
    }
    this.mouseOverComponentNode = find;
    find.mouseOverFlag = true;
    find.mouseOverTOP = mouseOverTOP;
  }

  clearMouseOver():void {
    if (this.mouseOverComponentNode) {
      this.mouseOverComponentNode.mouseOverFlag = false;
    }
    this.mouseOverComponentNode = null;
  }

  selectComponent(id:string):void {
    let find = this.findById(id);

    if (find) {

      if (this.selectedComponentNode) {
        this.selectedComponentNode.selected = false;
      }
      this.selectedComponentNode = find;

      find.selected = true;

      let tmp = find;
      while (tmp != null) {
        tmp.open = true;
        tmp = tmp.parent;
        // console.log('set open');
      }
    }
  }

  findById(id:string):ComponentNode {
    let find = this.findByIdWithParent(id, this);
    return find;
  }

  private findByIdWithParent(id:string, root:ComponentNode) {
    if (root.id == id) {
      return root;
    }
    for (var i = 0; i < root.items.length; i++) {
      let r = this.findByIdWithParent(id, root.items[i]);
      if (r) {
        return r;
      }
    }
    return null;
  }

  getParent():ComponentNode {
    return this.parent;
  }

  getRoot():ComponentNode {
    if (this.parent == null) {
      return this;
    }
    var current = this.parent;
    while (current.parent != null) {
      current = current.parent;
    }
    return current;
  }

  getId():string {
    return this.id;
  }


  private forEachFun(node:ComponentNode, fun:any):void {
    // console.log(node.getId())
    fun(node);
    if (node.items) {
      for (var i = 0; i < node.items.length; i++) {
        this.forEachFun(node.items[i], fun);
      }
    }
  }

  /**
   * 展开所有
   */
  expandAll():void {
    this.forEachFun(this, function (node:ComponentNode) {
      node.open = true;
    })
  }

  collapseAll():void {
    this.forEachFun(this, function (node:ComponentNode) {
      node.open = false;
    })
  }

}
