import { reactive } from "vue";

class Modal {
  constructor() {
    this.data = reactive({
      add: false,
      edit: false,
    });
  }

  show(name) {
    this.data[name] = true;
  }

  hide(name) {
    this.data[name] = false;
  }
}

export default new Modal();
