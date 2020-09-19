const OVALEDGE_EXT = {
  init: function () {
    this.toggleExt();
    this.bindMessageEvent();
    this.bindChromeMessageEvent();
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;
  },

  toggleExt: function (open = false) {
    if (document.getElementById("myId1")) {
      if (document.getElementById("myId1").style.display === "none" || open) {
        document.getElementById("myId1").style.display = "block";
      } else {
        document.getElementById("myId1").style.display = "none";
      }
      return false;
    }
    const modal = document.createElement("div");
    modal.style.display = "none";
    modal.setAttribute("id", "myId1");
    modal.innerHTML = `
      <div id="myId1header"></div>
      <iframe id="ovaledgeExt" style="height:100%;"></iframe>
    `;
    document.body.appendChild(modal);
    const dialog = document.getElementById("myId1");
    dialog.style.display = "none";
    const iframe = document.getElementById("ovaledgeExt");
    iframe.src = chrome.extension.getURL("index.html");
    iframe.frameBorder = 0;
    this.elmnt = dialog;
    this.dragElement();
    this.bindMouseUpEvent();
    this.bindRightClickEvent();
  },

  bindMouseUpEvent: function () {
    let that = this;
    document.body.addEventListener("mouseup", function (e) {
      let selection = that.getSelection();
      if (selection) {
        chrome.runtime.sendMessage({
          type: "selectedText",
          message: selection?.toString?.()?.trim?.(),
        });
        chrome.storage.sync.get(["enableSelection"], (result) => {
          if (result.enableSelection) {
            let url = window.location.href;
            that.setDomain({
              host: new URL(url).origin,
              url,
              search: true,
            });
          }
        });
      }
    });
  },

  bindRightClickEvent: function () {
    let that = this;
    document.body.addEventListener("contextmenu", (e) => {
      let selection = e.target.innerText;
      let selectedText = that.getSelection();
      chrome.runtime.sendMessage({
        type: "selectedText",
        isRightClick: true,
        message: selectedText
          ? selectedText
          : selection?.toString?.()?.trim?.(),
      });
    });
  },

  getSelection: function () {
    let selection;
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange();
    }
    return selection.toString().trim() || "";
  },

  bindMessageEvent: function () {
    let that = this;
    window.addEventListener("message", function (ev) {
      let obj = ev.data;
      switch (obj.name) {
        case "closeIframe":
          const dialog = document.getElementById("myId1");
          dialog.style.display = "none";
          break;
        case "resizeIframe":
          const iframe = document.getElementById("ovaledgeExt");
          iframe.style.height = obj.height;
          iframe.style.transition = obj.transition ? "all 200ms ease" : "none";
          break;
        case "closeDrag":
          that.closeDragElement();
          break;
      }
    });
  },

  bindChromeMessageEvent: function () {
    let that = this;
    chrome.runtime.onMessage.addListener((request) => {
      let { url = "", type, host = "", search = false } = request;
      if (type === "toggleExt") {
        that.toggleExt();
        return;
      }
      if (type === "setDomain") {
        that.setDomain({ url, host, search });
        return;
      }
    });
  },

  setDomain: function ({ url, host, search }) {
    chrome.runtime.sendMessage(
      {
        type: "setDomainURL",
        url,
        host,
        search,
      },
      () => this.toggleExt(search)
    );
  },
  closeDragElement: function () {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  },
  dragElement: function () {
    let that = this;
    let elmnt = document.getElementById("myId1");
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById("myId1header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById("myId1header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      document.getElementById("myId1header").onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = that.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  },
};

OVALEDGE_EXT.init();
