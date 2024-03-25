(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@iabtcf/stub/lib/stub.js
  var require_stub = __commonJS({
    "node_modules/@iabtcf/stub/lib/stub.js"(exports, module) {
      "use strict";
      function _typeof(t) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
          return typeof t2;
        } : function(t2) {
          return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
        })(t);
      }
      !function() {
        var t = function() {
          var t2, e, o = [], n = window, r = n;
          for (; r; ) {
            try {
              if (r.frames.__tcfapiLocator) {
                t2 = r;
                break;
              }
            } catch (t3) {
            }
            if (r === n.top)
              break;
            r = r.parent;
          }
          t2 || (!function t3() {
            var e2 = n.document, o2 = !!n.frames.__tcfapiLocator;
            if (!o2)
              if (e2.body) {
                var r2 = e2.createElement("iframe");
                r2.style.cssText = "display:none", r2.name = "__tcfapiLocator", e2.body.appendChild(r2);
              } else
                setTimeout(t3, 5);
            return !o2;
          }(), n.__tcfapi = function() {
            for (var t3 = arguments.length, n2 = new Array(t3), r2 = 0; r2 < t3; r2++)
              n2[r2] = arguments[r2];
            if (!n2.length)
              return o;
            "setGdprApplies" === n2[0] ? n2.length > 3 && 2 === parseInt(n2[1], 10) && "boolean" == typeof n2[3] && (e = n2[3], "function" == typeof n2[2] && n2[2]("set", true)) : "ping" === n2[0] ? "function" == typeof n2[2] && n2[2]({ gdprApplies: e, cmpLoaded: false, cmpStatus: "stub" }) : o.push(n2);
          }, n.addEventListener("message", function(t3) {
            var e2 = "string" == typeof t3.data, o2 = {};
            if (e2)
              try {
                o2 = JSON.parse(t3.data);
              } catch (t4) {
              }
            else
              o2 = t3.data;
            var n2 = "object" === _typeof(o2) && null !== o2 ? o2.__tcfapiCall : null;
            n2 && window.__tcfapi(n2.command, n2.version, function(o3, r2) {
              var a = { __tcfapiReturn: { returnValue: o3, success: r2, callId: n2.callId } };
              t3 && t3.source && t3.source.postMessage && t3.source.postMessage(e2 ? JSON.stringify(a) : a, "*");
            }, n2.parameter);
          }, false));
        };
        "undefined" != typeof module ? module.exports = t : t();
      }();
    }
  });

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/TCFCommand.js
  var TCFCommand;
  (function(TCFCommand2) {
    TCFCommand2["PING"] = "ping";
    TCFCommand2["GET_TC_DATA"] = "getTCData";
    TCFCommand2["GET_IN_APP_TC_DATA"] = "getInAppTCData";
    TCFCommand2["GET_VENDOR_LIST"] = "getVendorList";
    TCFCommand2["ADD_EVENT_LISTENER"] = "addEventListener";
    TCFCommand2["REMOVE_EVENT_LISTENER"] = "removeEventListener";
  })(TCFCommand || (TCFCommand = {}));

  // node_modules/@iabtcf/cmpapi/lib/mjs/status/CmpStatus.js
  var CmpStatus;
  (function(CmpStatus2) {
    CmpStatus2["STUB"] = "stub";
    CmpStatus2["LOADING"] = "loading";
    CmpStatus2["LOADED"] = "loaded";
    CmpStatus2["ERROR"] = "error";
  })(CmpStatus || (CmpStatus = {}));

  // node_modules/@iabtcf/cmpapi/lib/mjs/status/DisplayStatus.js
  var DisplayStatus;
  (function(DisplayStatus2) {
    DisplayStatus2["VISIBLE"] = "visible";
    DisplayStatus2["HIDDEN"] = "hidden";
    DisplayStatus2["DISABLED"] = "disabled";
  })(DisplayStatus || (DisplayStatus = {}));

  // node_modules/@iabtcf/cmpapi/lib/mjs/status/EventStatus.js
  var EventStatus;
  (function(EventStatus2) {
    EventStatus2["TC_LOADED"] = "tcloaded";
    EventStatus2["CMP_UI_SHOWN"] = "cmpuishown";
    EventStatus2["USER_ACTION_COMPLETE"] = "useractioncomplete";
  })(EventStatus || (EventStatus = {}));

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/Command.js
  var Command = class {
    listenerId;
    callback;
    next;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    param;
    success = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(callback, param, listenerId, next) {
      Object.assign(this, {
        callback,
        listenerId,
        param,
        next
      });
      try {
        this.respond();
      } catch (error) {
        this.invokeCallback(null);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invokeCallback(response) {
      const success = response !== null;
      if (typeof this.next === "function") {
        this.callback(this.next, response, success);
      } else {
        this.callback(response, success);
      }
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/GetTCDataCommand.js
  var GetTCDataCommand = class extends Command {
    respond() {
      this.throwIfParamInvalid();
      this.invokeCallback(new TCData(this.param, this.listenerId));
    }
    throwIfParamInvalid() {
      if (this.param !== void 0 && (!Array.isArray(this.param) || !this.param.every(Number.isInteger))) {
        throw new Error("Invalid Parameter");
      }
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/EventListenerQueue.js
  var EventListenerQueue = class {
    eventQueue = /* @__PURE__ */ new Map();
    queueNumber = 0;
    add(eventItems) {
      this.eventQueue.set(this.queueNumber, eventItems);
      return this.queueNumber++;
    }
    remove(listenerId) {
      return this.eventQueue.delete(listenerId);
    }
    exec() {
      this.eventQueue.forEach((eventItem, listenerId) => {
        new GetTCDataCommand(eventItem.callback, eventItem.param, listenerId, eventItem.next);
      });
    }
    clear() {
      this.queueNumber = 0;
      this.eventQueue.clear();
    }
    get size() {
      return this.eventQueue.size;
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/CmpApiModel.js
  var CmpApiModel = class {
    static apiVersion = "2";
    static tcfPolicyVersion;
    static eventQueue = new EventListenerQueue();
    static cmpStatus = CmpStatus.LOADING;
    static disabled = false;
    static displayStatus = DisplayStatus.HIDDEN;
    static cmpId;
    static cmpVersion;
    static eventStatus;
    static gdprApplies;
    static tcModel;
    static tcString;
    static reset() {
      delete this.cmpId;
      delete this.cmpVersion;
      delete this.eventStatus;
      delete this.gdprApplies;
      delete this.tcModel;
      delete this.tcString;
      delete this.tcfPolicyVersion;
      this.cmpStatus = CmpStatus.LOADING;
      this.disabled = false;
      this.displayStatus = DisplayStatus.HIDDEN;
      this.eventQueue.clear();
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/response/Response.js
  var Response = class {
    cmpId = CmpApiModel.cmpId;
    cmpVersion = CmpApiModel.cmpVersion;
    gdprApplies = CmpApiModel.gdprApplies;
    tcfPolicyVersion = CmpApiModel.tcfPolicyVersion;
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/response/Disabled.js
  var Disabled = class extends Response {
    cmpStatus = CmpStatus.ERROR;
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/response/TCData.js
  var TCData = class extends Response {
    tcString;
    listenerId;
    eventStatus;
    cmpStatus;
    isServiceSpecific;
    useNonStandardStacks;
    publisherCC;
    purposeOneTreatment;
    outOfBand;
    purpose;
    vendor;
    specialFeatureOptins;
    publisher;
    /**
     * Constructor to create a TCData object from a TCModel
     * @param {number[]} vendorIds - if not undefined, will be used to filter vendor ids
     * @param {number} listenerId - if there is a listenerId to add
     */
    constructor(vendorIds, listenerId) {
      super();
      this.eventStatus = CmpApiModel.eventStatus;
      this.cmpStatus = CmpApiModel.cmpStatus;
      this.listenerId = listenerId;
      if (CmpApiModel.gdprApplies) {
        const tcModel = CmpApiModel.tcModel;
        this.tcString = CmpApiModel.tcString;
        this.isServiceSpecific = tcModel.isServiceSpecific;
        this.useNonStandardStacks = tcModel.useNonStandardStacks;
        this.purposeOneTreatment = tcModel.purposeOneTreatment;
        this.publisherCC = tcModel.publisherCountryCode;
        this.outOfBand = {
          allowedVendors: this.createVectorField(tcModel.vendorsAllowed, vendorIds),
          disclosedVendors: this.createVectorField(tcModel.vendorsDisclosed, vendorIds)
        };
        this.purpose = {
          consents: this.createVectorField(tcModel.purposeConsents),
          legitimateInterests: this.createVectorField(tcModel.purposeLegitimateInterests)
        };
        this.vendor = {
          consents: this.createVectorField(tcModel.vendorConsents, vendorIds),
          legitimateInterests: this.createVectorField(tcModel.vendorLegitimateInterests, vendorIds)
        };
        this.specialFeatureOptins = this.createVectorField(tcModel.specialFeatureOptins);
        this.publisher = {
          consents: this.createVectorField(tcModel.publisherConsents),
          legitimateInterests: this.createVectorField(tcModel.publisherLegitimateInterests),
          customPurpose: {
            consents: this.createVectorField(tcModel.publisherCustomConsents),
            legitimateInterests: this.createVectorField(tcModel.publisherCustomLegitimateInterests)
          },
          restrictions: this.createRestrictions(tcModel.publisherRestrictions)
        };
      }
    }
    /**
     * Creates a restrictions object given a PurposeRestrictionVector
     * @param {PurposeRestrictionVector} purpRestrictions
     * @return {Restrictions}
     */
    createRestrictions(purpRestrictions) {
      const retr = {};
      if (purpRestrictions.numRestrictions > 0) {
        const max = purpRestrictions.getMaxVendorId();
        for (let vendorId = 1; vendorId <= max; vendorId++) {
          const strVendorId = vendorId.toString();
          purpRestrictions.getRestrictions(vendorId).forEach((pRestrict) => {
            const strPurpId = pRestrict.purposeId.toString();
            if (!retr[strPurpId]) {
              retr[strPurpId] = {};
            }
            retr[strPurpId][strVendorId] = pRestrict.restrictionType;
          });
        }
      }
      return retr;
    }
    /**
     * Creates a string bit field with a value for each id where each value is
     * '1' if its id is in the passed in vector Can be overwritten to return a
     * string
     * @param {Vector} vector
     * @param {number[]} ids filter
     * @return {BooleanVector | string}
     */
    createVectorField(vector, ids) {
      if (ids) {
        return ids.reduce((booleanVector, obj) => {
          booleanVector[String(obj)] = vector.has(Number(obj));
          return booleanVector;
        }, {});
      }
      return [...vector].reduce((booleanVector, keys) => {
        booleanVector[keys[0].toString(10)] = keys[1];
        return booleanVector;
      }, {});
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/response/InAppTCData.js
  var InAppTCData = class extends TCData {
    constructor(vendorIds) {
      super(vendorIds);
      delete this.outOfBand;
    }
    /**
     * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
     * @override
     * @param {Vector} vector
     * @return {string}
     */
    createVectorField(vector) {
      return [...vector].reduce((str, tpl) => {
        str += tpl[1] ? "1" : "0";
        return str;
      }, "");
    }
    /**
     * Creates a restrictions object given a PurposeRestrictionVector
     * @override
     * @param {PurposeRestrictionVector} purpRestrictions
     * @return {Restrictions}
     */
    createRestrictions(purpRestrictions) {
      const retr = {};
      if (purpRestrictions.numRestrictions > 0) {
        const maxVendorId = purpRestrictions.getMaxVendorId();
        purpRestrictions.getRestrictions().forEach((pRestrict) => {
          retr[pRestrict.purposeId.toString()] = "_".repeat(maxVendorId);
        });
        for (let i = 0; i < maxVendorId; i++) {
          const vendorId = i + 1;
          purpRestrictions.getRestrictions(vendorId).forEach((pRestrict) => {
            const strType = pRestrict.restrictionType.toString();
            const strPurp = pRestrict.purposeId.toString();
            const firstPart = retr[strPurp].substr(0, i);
            const lastPart = retr[strPurp].substr(i + 1);
            retr[strPurp] = firstPart + strType + lastPart;
          });
        }
      }
      return retr;
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/response/Ping.js
  var Ping = class extends Response {
    /**
     * true - CMP main script is loaded
     * false - still running stub
     */
    cmpLoaded = true;
    /**
     * see Ping Status Codes in following table
     */
    cmpStatus = CmpApiModel.cmpStatus;
    /**
     * see Ping Status Codes in following table
     */
    displayStatus = CmpApiModel.displayStatus;
    /**
     * version of the CMP API that is supported; e.g. “2”
     */
    apiVersion = String(CmpApiModel.apiVersion);
    /**
     * Version of the GVL currently loaded by the CMP
     * undefined if still the stub
     */
    gvlVersion;
    constructor() {
      super();
      if (CmpApiModel.tcModel && CmpApiModel.tcModel.vendorListVersion) {
        this.gvlVersion = +CmpApiModel.tcModel.vendorListVersion;
      }
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/PingCommand.js
  var PingCommand = class extends Command {
    respond() {
      this.invokeCallback(new Ping());
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/GetInAppTCDataCommand.js
  var GetInAppTCDataCommand = class extends GetTCDataCommand {
    respond() {
      this.throwIfParamInvalid();
      this.invokeCallback(new InAppTCData(this.param));
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/errors/DecodingError.js
  var DecodingError = class extends Error {
    /**
     * constructor - constructs an DecodingError
     *
     * @param {string} msg - Decoding Error Message
     * @return {undefined}
     */
    constructor(msg) {
      super(msg);
      this.name = "DecodingError";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/errors/EncodingError.js
  var EncodingError = class extends Error {
    /**
     * constructor - constructs an EncodingError
     *
     * @param {string} msg - Encoding Error Message
     * @return {undefined}
     */
    constructor(msg) {
      super(msg);
      this.name = "EncodingError";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/errors/GVLError.js
  var GVLError = class extends Error {
    /**
     * constructor - constructs a GVLError
     *
     * @param {string} msg - Error message to display
     * @return {undefined}
     */
    constructor(msg) {
      super(msg);
      this.name = "GVLError";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/errors/TCModelError.js
  var TCModelError = class extends Error {
    /**
     * constructor - constructs an TCModelError
     *
     * @param {string} fieldName - the errored field
     * @param {string} passedValue - what was passed
     * @return {undefined}
     */
    constructor(fieldName, passedValue, msg = "") {
      super(`invalid value ${passedValue} passed for ${fieldName} ${msg}`);
      this.name = "TCModelError";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/Base64Url.js
  var Base64Url = class {
    /**
     * Base 64 URL character set.  Different from standard Base64 char set
     * in that '+' and '/' are replaced with '-' and '_'.
     */
    static DICT = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    static REVERSE_DICT = /* @__PURE__ */ new Map([
      ["A", 0],
      ["B", 1],
      ["C", 2],
      ["D", 3],
      ["E", 4],
      ["F", 5],
      ["G", 6],
      ["H", 7],
      ["I", 8],
      ["J", 9],
      ["K", 10],
      ["L", 11],
      ["M", 12],
      ["N", 13],
      ["O", 14],
      ["P", 15],
      ["Q", 16],
      ["R", 17],
      ["S", 18],
      ["T", 19],
      ["U", 20],
      ["V", 21],
      ["W", 22],
      ["X", 23],
      ["Y", 24],
      ["Z", 25],
      ["a", 26],
      ["b", 27],
      ["c", 28],
      ["d", 29],
      ["e", 30],
      ["f", 31],
      ["g", 32],
      ["h", 33],
      ["i", 34],
      ["j", 35],
      ["k", 36],
      ["l", 37],
      ["m", 38],
      ["n", 39],
      ["o", 40],
      ["p", 41],
      ["q", 42],
      ["r", 43],
      ["s", 44],
      ["t", 45],
      ["u", 46],
      ["v", 47],
      ["w", 48],
      ["x", 49],
      ["y", 50],
      ["z", 51],
      ["0", 52],
      ["1", 53],
      ["2", 54],
      ["3", 55],
      ["4", 56],
      ["5", 57],
      ["6", 58],
      ["7", 59],
      ["8", 60],
      ["9", 61],
      ["-", 62],
      ["_", 63]
    ]);
    /**
     * log2(64) = 6
     */
    static BASIS = 6;
    static LCM = 24;
    /**
     * encodes an arbitrary-length bitfield string into base64url
     *
     * @static
     * @param {string} str - arbitrary-length bitfield string to be encoded to base64url
     * @return {string} - base64url encoded result
     */
    static encode(str) {
      if (!/^[0-1]+$/.test(str)) {
        throw new EncodingError("Invalid bitField");
      }
      const padding = str.length % this.LCM;
      str += padding ? "0".repeat(this.LCM - padding) : "";
      let result = "";
      for (let i = 0; i < str.length; i += this.BASIS) {
        result += this.DICT[parseInt(str.substr(i, this.BASIS), 2)];
      }
      return result;
    }
    /**
     * decodes a base64url encoded bitfield string
     *
     * @static
     * @param {string} str - base64url encoded bitfield string to be decoded
     * @return {string} - bitfield string
     */
    static decode(str) {
      if (!/^[A-Za-z0-9\-_]+$/.test(str)) {
        throw new DecodingError("Invalidly encoded Base64URL string");
      }
      let result = "";
      for (let i = 0; i < str.length; i++) {
        const strBits = this.REVERSE_DICT.get(str[i]).toString(2);
        result += "0".repeat(this.BASIS - strBits.length) + strBits;
      }
      return result;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/Cloneable.js
  var Cloneable = class {
    /**
     * clone - returns a copy of the classes with new values and not references
     *
     * @return {T}
     */
    clone() {
      const myClone = new this.constructor();
      const keys = Object.keys(this);
      keys.forEach((key) => {
        const value = this.deepClone(this[key]);
        if (value !== void 0) {
          myClone[key] = value;
        }
      });
      return myClone;
    }
    /**
     * deepClone - recursive function that makes copies of reference values
     *
     * @param {unknown} item
     * @return {unknown}
     */
    deepClone(item) {
      const itsType = typeof item;
      if (itsType === "number" || itsType === "string" || itsType === "boolean") {
        return item;
      } else if (item !== null && itsType === "object") {
        if (typeof item.clone === "function") {
          return item.clone();
        } else if (item instanceof Date) {
          return new Date(item.getTime());
        } else if (item[Symbol.iterator] !== void 0) {
          const ar = [];
          for (const subItem of item) {
            ar.push(this.deepClone(subItem));
          }
          if (item instanceof Array) {
            return ar;
          } else {
            return new item.constructor(ar);
          }
        } else {
          const retr = {};
          for (const prop in item) {
            if (item.hasOwnProperty(prop)) {
              retr[prop] = this.deepClone(item[prop]);
            }
          }
          return retr;
        }
      }
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/model/BinarySearchTree.js
  var BinarySearchTree = class _BinarySearchTree extends Cloneable {
    root = null;
    getRoot() {
      return this.root;
    }
    isEmpty() {
      return !this.root;
    }
    add(value) {
      const node = {
        value,
        left: null,
        right: null
      };
      let current;
      if (this.isEmpty()) {
        this.root = node;
      } else {
        current = this.root;
        while (true) {
          if (value < current.value) {
            if (current.left === null) {
              current.left = node;
              break;
            } else {
              current = current.left;
            }
          } else if (value > current.value) {
            if (current.right === null) {
              current.right = node;
              break;
            } else {
              current = current.right;
            }
          } else {
            break;
          }
        }
      }
    }
    /**
     * performs Morris in-order traversal
     * @return {number[]} sorted array
     */
    get() {
      const retr = [];
      let current = this.root;
      while (current) {
        if (!current.left) {
          retr.push(current.value);
          current = current.right;
        } else {
          let pre = current.left;
          while (pre.right && pre.right != current) {
            pre = pre.right;
          }
          if (pre.right == current) {
            pre.right = null;
            retr.push(current.value);
            current = current.right;
          } else {
            pre.right = current;
            current = current.left;
          }
        }
      }
      return retr;
    }
    contains(value) {
      let retr = false;
      let current = this.root;
      while (current) {
        if (current.value === value) {
          retr = true;
          break;
        } else if (value > current.value) {
          current = current.right;
        } else if (value < current.value) {
          current = current.left;
        }
      }
      return retr;
    }
    min(current = this.root) {
      let retr;
      while (current) {
        if (current.left) {
          current = current.left;
        } else {
          retr = current.value;
          current = null;
        }
      }
      return retr;
    }
    max(current = this.root) {
      let retr;
      while (current) {
        if (current.right) {
          current = current.right;
        } else {
          retr = current.value;
          current = null;
        }
      }
      return retr;
    }
    remove(value, current = this.root) {
      let parent = null;
      let parentSide = "left";
      while (current) {
        if (value < current.value) {
          parent = current;
          current = current.left;
          parentSide = "left";
        } else if (value > current.value) {
          parent = current;
          current = current.right;
          parentSide = "right";
        } else {
          if (!current.left && !current.right) {
            if (parent) {
              parent[parentSide] = null;
            } else {
              this.root = null;
            }
          } else if (!current.left) {
            if (parent) {
              parent[parentSide] = current.right;
            } else {
              this.root = current.right;
            }
          } else if (!current.right) {
            if (parent) {
              parent[parentSide] = current.left;
            } else {
              this.root = current.left;
            }
          } else {
            const minVal = this.min(current.right);
            this.remove(minVal, current.right);
            current.value = minVal;
          }
          current = null;
        }
      }
    }
    /**
     * Build Binary Search Tree from the ordered number array.
     *  The depth of the tree will be the `log2` of the array length.
     * @param {number[]} values number array in ascending order
     * @return {BinarySearchTree} Binary Search Tree
     */
    static build(values) {
      if (!values || values.length === 0) {
        return null;
      } else if (values.length === 1) {
        const tree = new _BinarySearchTree();
        tree.add(values[0]);
        return tree;
      } else {
        const rootIndex = values.length >> 1;
        const tree = new _BinarySearchTree();
        tree.add(values[rootIndex]);
        const root = tree.getRoot();
        if (root) {
          if (rootIndex + 1 < values.length) {
            const rightTree = _BinarySearchTree.build(values.slice(rootIndex + 1));
            root.right = rightTree ? rightTree.getRoot() : null;
          }
          if (rootIndex - 1 > 0) {
            const leftTree = _BinarySearchTree.build(values.slice(0, rootIndex - 1));
            root.left = leftTree ? leftTree.getRoot() : null;
          }
        }
        return tree;
      }
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/model/ConsentLanguages.js
  var ConsentLanguages = class _ConsentLanguages {
    static langSet = /* @__PURE__ */ new Set([
      "BG",
      "CA",
      "CS",
      "DA",
      "DE",
      "EL",
      "EN",
      "ES",
      "ET",
      "FI",
      "FR",
      "HR",
      "HU",
      "IT",
      "JA",
      "LT",
      "LV",
      "MT",
      "NL",
      "NO",
      "PL",
      "PT",
      "RO",
      "RU",
      "SK",
      "SL",
      "SV",
      "TR",
      "ZH"
    ]);
    has(key) {
      return _ConsentLanguages.langSet.has(key);
    }
    forEach(callback) {
      _ConsentLanguages.langSet.forEach(callback);
    }
    get size() {
      return _ConsentLanguages.langSet.size;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/model/Fields.js
  var Fields = class {
    static cmpId = "cmpId";
    static cmpVersion = "cmpVersion";
    static consentLanguage = "consentLanguage";
    static consentScreen = "consentScreen";
    static created = "created";
    static supportOOB = "supportOOB";
    static isServiceSpecific = "isServiceSpecific";
    static lastUpdated = "lastUpdated";
    static numCustomPurposes = "numCustomPurposes";
    static policyVersion = "policyVersion";
    static publisherCountryCode = "publisherCountryCode";
    static publisherCustomConsents = "publisherCustomConsents";
    static publisherCustomLegitimateInterests = "publisherCustomLegitimateInterests";
    static publisherLegitimateInterests = "publisherLegitimateInterests";
    static publisherConsents = "publisherConsents";
    static publisherRestrictions = "publisherRestrictions";
    static purposeConsents = "purposeConsents";
    static purposeLegitimateInterests = "purposeLegitimateInterests";
    static purposeOneTreatment = "purposeOneTreatment";
    static specialFeatureOptins = "specialFeatureOptins";
    static useNonStandardStacks = "useNonStandardStacks";
    static vendorConsents = "vendorConsents";
    static vendorLegitimateInterests = "vendorLegitimateInterests";
    static vendorListVersion = "vendorListVersion";
    static vendorsAllowed = "vendorsAllowed";
    static vendorsDisclosed = "vendorsDisclosed";
    static version = "version";
  };

  // node_modules/@iabtcf/core/lib/mjs/model/RestrictionType.js
  var RestrictionType;
  (function(RestrictionType2) {
    RestrictionType2[RestrictionType2["NOT_ALLOWED"] = 0] = "NOT_ALLOWED";
    RestrictionType2[RestrictionType2["REQUIRE_CONSENT"] = 1] = "REQUIRE_CONSENT";
    RestrictionType2[RestrictionType2["REQUIRE_LI"] = 2] = "REQUIRE_LI";
  })(RestrictionType || (RestrictionType = {}));

  // node_modules/@iabtcf/core/lib/mjs/model/PurposeRestriction.js
  var PurposeRestriction = class _PurposeRestriction extends Cloneable {
    static hashSeparator = "-";
    purposeId_;
    restrictionType;
    /**
     * constructor
     *
     * @param {number} purposeId? - may optionally pass the purposeId into the
     * constructor
     * @param {RestrictionType} restrictionType? - may
     * optionally pass the restrictionType into the constructor
     * @return {undefined}
     */
    constructor(purposeId, restrictionType) {
      super();
      if (purposeId !== void 0) {
        this.purposeId = purposeId;
      }
      if (restrictionType !== void 0) {
        this.restrictionType = restrictionType;
      }
    }
    static unHash(hash) {
      const splitUp = hash.split(this.hashSeparator);
      const purpRestriction = new _PurposeRestriction();
      if (splitUp.length !== 2) {
        throw new TCModelError("hash", hash);
      }
      purpRestriction.purposeId = parseInt(splitUp[0], 10);
      purpRestriction.restrictionType = parseInt(splitUp[1], 10);
      return purpRestriction;
    }
    get hash() {
      if (!this.isValid()) {
        throw new Error("cannot hash invalid PurposeRestriction");
      }
      return `${this.purposeId}${_PurposeRestriction.hashSeparator}${this.restrictionType}`;
    }
    /**
     * @return {number} The purpose Id associated with a publisher
     * purpose-by-vendor restriction that resulted in a different consent or LI
     * status than the consent or LI purposes allowed lists.
     */
    get purposeId() {
      return this.purposeId_;
    }
    /**
     * @param {number} idNum - The purpose Id associated with a publisher
     * purpose-by-vendor restriction that resulted in a different consent or LI
     * status than the consent or LI purposes allowed lists.
     */
    set purposeId(idNum) {
      this.purposeId_ = idNum;
    }
    isValid() {
      return Number.isInteger(this.purposeId) && this.purposeId > 0 && (this.restrictionType === RestrictionType.NOT_ALLOWED || this.restrictionType === RestrictionType.REQUIRE_CONSENT || this.restrictionType === RestrictionType.REQUIRE_LI);
    }
    isSameAs(otherPR) {
      return this.purposeId === otherPR.purposeId && this.restrictionType === otherPR.restrictionType;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/model/PurposeRestrictionVector.js
  var PurposeRestrictionVector = class extends Cloneable {
    /**
     * if this originatd from an encoded string we'll need a place to store the
     * bit length; it can be set and got from here
     */
    bitLength = 0;
    /**
     * a map indexed by a string which will be a 'hash' of the purpose and
     * restriction type.
     *
     * Using a BST to keep vendors in a sorted order for encoding later
     */
    map = /* @__PURE__ */ new Map();
    gvl_;
    has(hash) {
      return this.map.has(hash);
    }
    isOkToHave(restrictionType, purposeId, vendorId) {
      let result = true;
      if (this.gvl?.vendors) {
        const vendor = this.gvl.vendors[vendorId];
        if (vendor) {
          if (restrictionType === RestrictionType.NOT_ALLOWED) {
            result = vendor.legIntPurposes.includes(purposeId) || vendor.purposes.includes(purposeId);
          } else if (vendor.flexiblePurposes.length) {
            switch (restrictionType) {
              case RestrictionType.REQUIRE_CONSENT:
                result = vendor.flexiblePurposes.includes(purposeId) && vendor.legIntPurposes.includes(purposeId);
                break;
              case RestrictionType.REQUIRE_LI:
                result = vendor.flexiblePurposes.includes(purposeId) && vendor.purposes.includes(purposeId);
                break;
            }
          } else {
            result = false;
          }
        } else {
          result = false;
        }
      }
      return result;
    }
    /**
     * add - adds a given Vendor ID under a given Purpose Restriction
     *
     * @param {number} vendorId
     * @param {PurposeRestriction} purposeRestriction
     * @return {void}
     */
    add(vendorId, purposeRestriction) {
      if (this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {
        const hash = purposeRestriction.hash;
        if (!this.has(hash)) {
          this.map.set(hash, new BinarySearchTree());
          this.bitLength = 0;
        }
        this.map.get(hash).add(vendorId);
      }
    }
    /**
     * restrictPurposeToLegalBasis - adds all Vendors under a given Purpose Restriction
     *
     * @param {PurposeRestriction} purposeRestriction
     * @return {void}
     */
    restrictPurposeToLegalBasis(purposeRestriction) {
      const vendors = this.gvl.vendorIds;
      const hash = purposeRestriction.hash;
      const lastEntry = function() {
        let value;
        for (value of vendors)
          ;
        return value;
      }();
      const values = [...Array(lastEntry).keys()].map((i) => i + 1);
      for (let i = 1; i <= lastEntry; i++) {
        if (!this.has(hash)) {
          this.map.set(hash, BinarySearchTree.build(values));
          this.bitLength = 0;
        }
        this.map.get(hash).add(i);
      }
    }
    /**
     * getVendors - returns array of vendor ids optionally narrowed by a given
     * Purpose Restriction.  If no purpose restriction is passed then all vendor
     * ids will be returned.  One can expect this result to be a unique set of
     * ids no duplicates.
     *
     * @param {PurposeRestriction} [purposeRestriction] - optionally passed to
     * get only Vendor IDs restricted under the given Purpose Restriction
     * @return {number[]} - Unique ID set of vendors
     */
    getVendors(purposeRestriction) {
      let vendorIds = [];
      if (purposeRestriction) {
        const hash = purposeRestriction.hash;
        if (this.has(hash)) {
          vendorIds = this.map.get(hash).get();
        }
      } else {
        const vendorSet = /* @__PURE__ */ new Set();
        this.map.forEach((bst) => {
          bst.get().forEach((vendorId) => {
            vendorSet.add(vendorId);
          });
        });
        vendorIds = Array.from(vendorSet);
      }
      return vendorIds;
    }
    getRestrictionType(vendorId, purposeId) {
      let rType;
      this.getRestrictions(vendorId).forEach((purposeRestriction) => {
        if (purposeRestriction.purposeId === purposeId) {
          if (rType === void 0 || rType > purposeRestriction.restrictionType) {
            rType = purposeRestriction.restrictionType;
          }
        }
      });
      return rType;
    }
    /**
     * vendorHasRestriction - determines whether a given Vendor ID is under a
     * given Purpose Restriction
     *
     * @param {number} vendorId
     * @param {PurposeRestriction} purposeRestriction
     * @return {boolean} - true if the give Vendor ID is under the given Purpose
     * Restriction
     */
    vendorHasRestriction(vendorId, purposeRestriction) {
      let has = false;
      const restrictions = this.getRestrictions(vendorId);
      for (let i = 0; i < restrictions.length && !has; i++) {
        has = purposeRestriction.isSameAs(restrictions[i]);
      }
      return has;
    }
    /**
     * getMaxVendorId - gets the Maximum Vendor ID regardless of Purpose
     * Restriction
     *
     * @return {number} - maximum Vendor ID
     */
    getMaxVendorId() {
      let retr = 0;
      this.map.forEach((bst) => {
        retr = Math.max(bst.max(), retr);
      });
      return retr;
    }
    getRestrictions(vendorId) {
      const retr = [];
      this.map.forEach((bst, hash) => {
        if (vendorId) {
          if (bst.contains(vendorId)) {
            retr.push(PurposeRestriction.unHash(hash));
          }
        } else {
          retr.push(PurposeRestriction.unHash(hash));
        }
      });
      return retr;
    }
    getPurposes() {
      const purposeIds = /* @__PURE__ */ new Set();
      this.map.forEach((bst, hash) => {
        purposeIds.add(PurposeRestriction.unHash(hash).purposeId);
      });
      return Array.from(purposeIds);
    }
    /**
     * remove - removes Vendor ID from a Purpose Restriction
     *
     * @param {number} vendorId
     * @param {PurposeRestriction} purposeRestriction
     * @return {void}
     */
    remove(vendorId, purposeRestriction) {
      const hash = purposeRestriction.hash;
      const bst = this.map.get(hash);
      if (bst) {
        bst.remove(vendorId);
        if (bst.isEmpty()) {
          this.map.delete(hash);
          this.bitLength = 0;
        }
      }
    }
    /**
     * Essential for being able to determine whether we can actually set a
     * purpose restriction since they have to have a flexible legal basis
     *
     * @param {GVL} value - the GVL instance
     */
    set gvl(value) {
      if (!this.gvl_) {
        this.gvl_ = value;
        this.map.forEach((bst, hash) => {
          const purposeRestriction = PurposeRestriction.unHash(hash);
          const vendors = bst.get();
          vendors.forEach((vendorId) => {
            if (!this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {
              bst.remove(vendorId);
            }
          });
        });
      }
    }
    /**
     * gvl returns local copy of the GVL these restrictions apply to
     *
     * @return {GVL}
     */
    get gvl() {
      return this.gvl_;
    }
    /**
     * isEmpty - whether or not this vector has any restrictions in it
     *
     * @return {boolean}
     */
    isEmpty() {
      return this.map.size === 0;
    }
    /**
     * numRestrictions - returns the number of Purpose Restrictions.
     *
     * @return {number}
     */
    get numRestrictions() {
      return this.map.size;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/model/DeviceDisclosureStorageAccessType.js
  var DeviceDisclosureStorageAccessType;
  (function(DeviceDisclosureStorageAccessType2) {
    DeviceDisclosureStorageAccessType2["COOKIE"] = "cookie";
    DeviceDisclosureStorageAccessType2["WEB"] = "web";
    DeviceDisclosureStorageAccessType2["APP"] = "app";
  })(DeviceDisclosureStorageAccessType || (DeviceDisclosureStorageAccessType = {}));

  // node_modules/@iabtcf/core/lib/mjs/model/Segment.js
  var Segment;
  (function(Segment2) {
    Segment2["CORE"] = "core";
    Segment2["VENDORS_DISCLOSED"] = "vendorsDisclosed";
    Segment2["VENDORS_ALLOWED"] = "vendorsAllowed";
    Segment2["PUBLISHER_TC"] = "publisherTC";
  })(Segment || (Segment = {}));

  // node_modules/@iabtcf/core/lib/mjs/model/SegmentIDs.js
  var SegmentIDs = class {
    /**
     * 0 = default - reserved for core string (does not need to be present in the core string)
     * 1 = OOB vendors disclosed
     * 2 = OOB vendors allowed
     * 3 = PublisherTC
     */
    static ID_TO_KEY = [
      Segment.CORE,
      Segment.VENDORS_DISCLOSED,
      Segment.VENDORS_ALLOWED,
      Segment.PUBLISHER_TC
    ];
    static KEY_TO_ID = {
      [Segment.CORE]: 0,
      [Segment.VENDORS_DISCLOSED]: 1,
      [Segment.VENDORS_ALLOWED]: 2,
      [Segment.PUBLISHER_TC]: 3
    };
  };

  // node_modules/@iabtcf/core/lib/mjs/model/Vector.js
  var Vector = class extends Cloneable {
    /**
     * if this originatd from an encoded string we'll need a place to store the
     * bit length; it can be set and got from here
     */
    bitLength = 0;
    maxId_ = 0;
    set_ = /* @__PURE__ */ new Set();
    *[Symbol.iterator]() {
      for (let i = 1; i <= this.maxId; i++) {
        yield [i, this.has(i)];
      }
    }
    /**
     * values()
     *
     * @return {IterableIterator<number>} - returns an iterator of the positive
     * values in the set
     */
    values() {
      return this.set_.values();
    }
    /**
     * maxId
     *
     * @return {number} - the highest id in this Vector
     */
    get maxId() {
      return this.maxId_;
    }
    /**
     * get
     *
     * @param {number} id - key for value to check
     * @return {boolean} - value of that key, if never set it will be false
     */
    has(id) {
      return this.set_.has(id);
    }
    /**
     * unset
     *
     * @param {SingleIDOrCollection} id - id or ids to unset
     * @return {void}
     */
    unset(id) {
      if (Array.isArray(id)) {
        id.forEach((id2) => this.unset(id2));
      } else if (typeof id === "object") {
        this.unset(Object.keys(id).map((strId) => Number(strId)));
      } else {
        this.set_.delete(Number(id));
        this.bitLength = 0;
        if (id === this.maxId) {
          this.maxId_ = 0;
          this.set_.forEach((id2) => {
            this.maxId_ = Math.max(this.maxId, id2);
          });
        }
      }
    }
    isIntMap(item) {
      let result = typeof item === "object";
      result = result && Object.keys(item).every((key) => {
        let itemResult = Number.isInteger(parseInt(key, 10));
        itemResult = itemResult && this.isValidNumber(item[key].id);
        itemResult = itemResult && item[key].name !== void 0;
        return itemResult;
      });
      return result;
    }
    isValidNumber(item) {
      return parseInt(item, 10) > 0;
    }
    isSet(item) {
      let result = false;
      if (item instanceof Set) {
        result = Array.from(item).every(this.isValidNumber);
      }
      return result;
    }
    /**
     * set - sets an item assumed to be a truthy value by its presence
     *
     * @param {SingleIDOrCollection} item - May be a single id (positive integer)
     * or collection of ids in a set, GVL Int Map, or Array.
     *
     * @return {void}
     */
    set(item) {
      if (Array.isArray(item)) {
        item.forEach((item2) => this.set(item2));
      } else if (this.isSet(item)) {
        this.set(Array.from(item));
      } else if (this.isIntMap(item)) {
        this.set(Object.keys(item).map((strId) => Number(strId)));
      } else if (this.isValidNumber(item)) {
        this.set_.add(item);
        this.maxId_ = Math.max(this.maxId, item);
        this.bitLength = 0;
      } else {
        throw new TCModelError("set()", item, "must be positive integer array, positive integer, Set<number>, or IntMap");
      }
    }
    empty() {
      this.set_ = /* @__PURE__ */ new Set();
    }
    /**
     * forEach - to traverse from id=1 to id=maxId in a sequential non-sparse manner
     *
     *
     * @param {forEachCallback} callback - callback to execute
     * @return {void}
     *
     * @callback forEachCallback
     * @param {boolean} value - whether or not this id exists in the vector
     * @param {number} id - the id number of the current iteration
     */
    forEach(callback) {
      for (let i = 1; i <= this.maxId; i++) {
        callback(this.has(i), i);
      }
    }
    get size() {
      return this.set_.size;
    }
    setAll(intMap) {
      this.set(intMap);
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/BitLength.js
  var BitLength = class {
    static [Fields.cmpId] = 12;
    static [Fields.cmpVersion] = 12;
    static [Fields.consentLanguage] = 12;
    static [Fields.consentScreen] = 6;
    static [Fields.created] = 36;
    static [Fields.isServiceSpecific] = 1;
    static [Fields.lastUpdated] = 36;
    static [Fields.policyVersion] = 6;
    static [Fields.publisherCountryCode] = 12;
    static [Fields.publisherLegitimateInterests] = 24;
    static [Fields.publisherConsents] = 24;
    static [Fields.purposeConsents] = 24;
    static [Fields.purposeLegitimateInterests] = 24;
    static [Fields.purposeOneTreatment] = 1;
    static [Fields.specialFeatureOptins] = 12;
    static [Fields.useNonStandardStacks] = 1;
    static [Fields.vendorListVersion] = 12;
    static [Fields.version] = 6;
    static anyBoolean = 1;
    static encodingType = 1;
    static maxId = 16;
    static numCustomPurposes = 6;
    static numEntries = 12;
    static numRestrictions = 12;
    static purposeId = 6;
    static restrictionType = 2;
    static segmentType = 3;
    static singleOrRange = 1;
    static vendorId = 16;
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/BooleanEncoder.js
  var BooleanEncoder = class {
    static encode(value) {
      return String(Number(value));
    }
    static decode(value) {
      return value === "1";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/IntEncoder.js
  var IntEncoder = class {
    static encode(value, numBits) {
      let bitString;
      if (typeof value === "string") {
        value = parseInt(value, 10);
      }
      bitString = value.toString(2);
      if (bitString.length > numBits || value < 0) {
        throw new EncodingError(`${value} too large to encode into ${numBits}`);
      }
      if (bitString.length < numBits) {
        bitString = "0".repeat(numBits - bitString.length) + bitString;
      }
      return bitString;
    }
    static decode(value, numBits) {
      if (numBits !== value.length) {
        throw new DecodingError("invalid bit length");
      }
      return parseInt(value, 2);
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/DateEncoder.js
  var DateEncoder = class {
    static encode(value, numBits) {
      return IntEncoder.encode(Math.round(value.getTime() / 100), numBits);
    }
    static decode(value, numBits) {
      if (numBits !== value.length) {
        throw new DecodingError("invalid bit length");
      }
      const date = /* @__PURE__ */ new Date();
      date.setTime(IntEncoder.decode(value, numBits) * 100);
      return date;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/FixedVectorEncoder.js
  var FixedVectorEncoder = class {
    static encode(value, numBits) {
      let bitString = "";
      for (let i = 1; i <= numBits; i++) {
        bitString += BooleanEncoder.encode(value.has(i));
      }
      return bitString;
    }
    static decode(value, numBits) {
      if (value.length !== numBits) {
        throw new DecodingError("bitfield encoding length mismatch");
      }
      const vector = new Vector();
      for (let i = 1; i <= numBits; i++) {
        if (BooleanEncoder.decode(value[i - 1])) {
          vector.set(i);
        }
      }
      vector.bitLength = value.length;
      return vector;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/LangEncoder.js
  var LangEncoder = class {
    static encode(value, numBits) {
      value = value.toUpperCase();
      const ASCII_START = 65;
      const firstLetter = value.charCodeAt(0) - ASCII_START;
      const secondLetter = value.charCodeAt(1) - ASCII_START;
      if (firstLetter < 0 || firstLetter > 25 || secondLetter < 0 || secondLetter > 25) {
        throw new EncodingError(`invalid language code: ${value}`);
      }
      if (numBits % 2 === 1) {
        throw new EncodingError(`numBits must be even, ${numBits} is not valid`);
      }
      numBits = numBits / 2;
      const firstLetterBString = IntEncoder.encode(firstLetter, numBits);
      const secondLetterBString = IntEncoder.encode(secondLetter, numBits);
      return firstLetterBString + secondLetterBString;
    }
    static decode(value, numBits) {
      let retr;
      if (numBits === value.length && !(value.length % 2)) {
        const ASCII_START = 65;
        const mid = value.length / 2;
        const firstLetter = IntEncoder.decode(value.slice(0, mid), mid) + ASCII_START;
        const secondLetter = IntEncoder.decode(value.slice(mid), mid) + ASCII_START;
        retr = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);
      } else {
        throw new DecodingError("invalid bit length for language");
      }
      return retr;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/PurposeRestrictionVectorEncoder.js
  var PurposeRestrictionVectorEncoder = class {
    static encode(prVector) {
      let bitString = IntEncoder.encode(prVector.numRestrictions, BitLength.numRestrictions);
      if (!prVector.isEmpty()) {
        prVector.getRestrictions().forEach((purpRestriction) => {
          bitString += IntEncoder.encode(purpRestriction.purposeId, BitLength.purposeId);
          bitString += IntEncoder.encode(purpRestriction.restrictionType, BitLength.restrictionType);
          const vendors = prVector.getVendors(purpRestriction);
          const len = vendors.length;
          let numEntries = 0;
          let startId = 0;
          let rangeField = "";
          for (let i = 0; i < len; i++) {
            const vendorId = vendors[i];
            if (startId === 0) {
              numEntries++;
              startId = vendorId;
            }
            const lastVendorId = vendors[len - 1];
            const gvlVendorIds = prVector.gvl.vendorIds;
            const nextGvlVendor = (vendorId2) => {
              while (++vendorId2 <= lastVendorId && !gvlVendorIds.has(vendorId2)) {
              }
              return vendorId2;
            };
            if (i === len - 1 || vendors[i + 1] > nextGvlVendor(vendorId)) {
              const isRange = !(vendorId === startId);
              rangeField += BooleanEncoder.encode(isRange);
              rangeField += IntEncoder.encode(startId, BitLength.vendorId);
              if (isRange) {
                rangeField += IntEncoder.encode(vendorId, BitLength.vendorId);
              }
              startId = 0;
            }
          }
          bitString += IntEncoder.encode(numEntries, BitLength.numEntries);
          bitString += rangeField;
        });
      }
      return bitString;
    }
    static decode(encodedString) {
      let index = 0;
      const vector = new PurposeRestrictionVector();
      const numRestrictions = IntEncoder.decode(encodedString.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);
      index += BitLength.numRestrictions;
      for (let i = 0; i < numRestrictions; i++) {
        const purposeId = IntEncoder.decode(encodedString.substr(index, BitLength.purposeId), BitLength.purposeId);
        index += BitLength.purposeId;
        const restrictionType = IntEncoder.decode(encodedString.substr(index, BitLength.restrictionType), BitLength.restrictionType);
        index += BitLength.restrictionType;
        const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);
        const numEntries = IntEncoder.decode(encodedString.substr(index, BitLength.numEntries), BitLength.numEntries);
        index += BitLength.numEntries;
        for (let j = 0; j < numEntries; j++) {
          const isARange = BooleanEncoder.decode(encodedString.substr(index, BitLength.anyBoolean));
          index += BitLength.anyBoolean;
          const startOrOnlyVendorId = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
          index += BitLength.vendorId;
          if (isARange) {
            const endVendorId = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
            index += BitLength.vendorId;
            if (endVendorId < startOrOnlyVendorId) {
              throw new DecodingError(`Invalid RangeEntry: endVendorId ${endVendorId} is less than ${startOrOnlyVendorId}`);
            }
            for (let k = startOrOnlyVendorId; k <= endVendorId; k++) {
              vector.add(k, purposeRestriction);
            }
          } else {
            vector.add(startOrOnlyVendorId, purposeRestriction);
          }
        }
      }
      vector.bitLength = index;
      return vector;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/VectorEncodingType.js
  var VectorEncodingType;
  (function(VectorEncodingType2) {
    VectorEncodingType2[VectorEncodingType2["FIELD"] = 0] = "FIELD";
    VectorEncodingType2[VectorEncodingType2["RANGE"] = 1] = "RANGE";
  })(VectorEncodingType || (VectorEncodingType = {}));

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/VendorVectorEncoder.js
  var VendorVectorEncoder = class {
    static encode(value) {
      const ranges = [];
      let range = [];
      let retrString = IntEncoder.encode(value.maxId, BitLength.maxId);
      let bitField = "";
      let rangeIsSmaller;
      const headerLength = BitLength.maxId + BitLength.encodingType;
      const bitFieldLength = headerLength + value.maxId;
      const minRangeLength = BitLength.vendorId * 2 + BitLength.singleOrRange + BitLength.numEntries;
      let rangeLength = headerLength + BitLength.numEntries;
      value.forEach((curValue, i) => {
        bitField += BooleanEncoder.encode(curValue);
        rangeIsSmaller = value.maxId > minRangeLength && rangeLength < bitFieldLength;
        if (rangeIsSmaller && curValue) {
          const nextValue = value.has(i + 1);
          if (!nextValue) {
            range.push(i);
            rangeLength += BitLength.vendorId;
            ranges.push(range);
            range = [];
          } else if (range.length === 0) {
            range.push(i);
            rangeLength += BitLength.singleOrRange;
            rangeLength += BitLength.vendorId;
          }
        }
      });
      if (rangeIsSmaller) {
        retrString += String(VectorEncodingType.RANGE);
        retrString += this.buildRangeEncoding(ranges);
      } else {
        retrString += String(VectorEncodingType.FIELD);
        retrString += bitField;
      }
      return retrString;
    }
    static decode(value, version) {
      let vector;
      let index = 0;
      const maxId = IntEncoder.decode(value.substr(index, BitLength.maxId), BitLength.maxId);
      index += BitLength.maxId;
      const encodingType = IntEncoder.decode(value.charAt(index), BitLength.encodingType);
      index += BitLength.encodingType;
      if (encodingType === VectorEncodingType.RANGE) {
        vector = new Vector();
        if (version === 1) {
          if (value.substr(index, 1) === "1") {
            throw new DecodingError("Unable to decode default consent=1");
          }
          index++;
        }
        const numEntries = IntEncoder.decode(value.substr(index, BitLength.numEntries), BitLength.numEntries);
        index += BitLength.numEntries;
        for (let i = 0; i < numEntries; i++) {
          const isIdRange = BooleanEncoder.decode(value.charAt(index));
          index += BitLength.singleOrRange;
          const firstId = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);
          index += BitLength.vendorId;
          if (isIdRange) {
            const secondId = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);
            index += BitLength.vendorId;
            for (let j = firstId; j <= secondId; j++) {
              vector.set(j);
            }
          } else {
            vector.set(firstId);
          }
        }
      } else {
        const bitField = value.substr(index, maxId);
        index += maxId;
        vector = FixedVectorEncoder.decode(bitField, maxId);
      }
      vector.bitLength = index;
      return vector;
    }
    static buildRangeEncoding(ranges) {
      const numEntries = ranges.length;
      let rangeString = IntEncoder.encode(numEntries, BitLength.numEntries);
      ranges.forEach((range) => {
        const single = range.length === 1;
        rangeString += BooleanEncoder.encode(!single);
        rangeString += IntEncoder.encode(range[0], BitLength.vendorId);
        if (!single) {
          rangeString += IntEncoder.encode(range[1], BitLength.vendorId);
        }
      });
      return rangeString;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/field/FieldEncoderMap.js
  function FieldEncoderMap() {
    return {
      [Fields.version]: IntEncoder,
      [Fields.created]: DateEncoder,
      [Fields.lastUpdated]: DateEncoder,
      [Fields.cmpId]: IntEncoder,
      [Fields.cmpVersion]: IntEncoder,
      [Fields.consentScreen]: IntEncoder,
      [Fields.consentLanguage]: LangEncoder,
      [Fields.vendorListVersion]: IntEncoder,
      [Fields.policyVersion]: IntEncoder,
      [Fields.isServiceSpecific]: BooleanEncoder,
      [Fields.useNonStandardStacks]: BooleanEncoder,
      [Fields.specialFeatureOptins]: FixedVectorEncoder,
      [Fields.purposeConsents]: FixedVectorEncoder,
      [Fields.purposeLegitimateInterests]: FixedVectorEncoder,
      [Fields.purposeOneTreatment]: BooleanEncoder,
      [Fields.publisherCountryCode]: LangEncoder,
      [Fields.vendorConsents]: VendorVectorEncoder,
      [Fields.vendorLegitimateInterests]: VendorVectorEncoder,
      [Fields.publisherRestrictions]: PurposeRestrictionVectorEncoder,
      segmentType: IntEncoder,
      [Fields.vendorsDisclosed]: VendorVectorEncoder,
      [Fields.vendorsAllowed]: VendorVectorEncoder,
      [Fields.publisherConsents]: FixedVectorEncoder,
      [Fields.publisherLegitimateInterests]: FixedVectorEncoder,
      [Fields.numCustomPurposes]: IntEncoder,
      [Fields.publisherCustomConsents]: FixedVectorEncoder,
      [Fields.publisherCustomLegitimateInterests]: FixedVectorEncoder
    };
  }

  // node_modules/@iabtcf/core/lib/mjs/encoder/sequence/FieldSequence.js
  var FieldSequence = class {
    "1" = {
      [Segment.CORE]: [
        Fields.version,
        Fields.created,
        Fields.lastUpdated,
        Fields.cmpId,
        Fields.cmpVersion,
        Fields.consentScreen,
        Fields.consentLanguage,
        Fields.vendorListVersion,
        Fields.purposeConsents,
        Fields.vendorConsents
      ]
    };
    "2" = {
      [Segment.CORE]: [
        Fields.version,
        Fields.created,
        Fields.lastUpdated,
        Fields.cmpId,
        Fields.cmpVersion,
        Fields.consentScreen,
        Fields.consentLanguage,
        Fields.vendorListVersion,
        Fields.policyVersion,
        Fields.isServiceSpecific,
        Fields.useNonStandardStacks,
        Fields.specialFeatureOptins,
        Fields.purposeConsents,
        Fields.purposeLegitimateInterests,
        Fields.purposeOneTreatment,
        Fields.publisherCountryCode,
        Fields.vendorConsents,
        Fields.vendorLegitimateInterests,
        Fields.publisherRestrictions
      ],
      [Segment.PUBLISHER_TC]: [
        Fields.publisherConsents,
        Fields.publisherLegitimateInterests,
        Fields.numCustomPurposes,
        Fields.publisherCustomConsents,
        Fields.publisherCustomLegitimateInterests
      ],
      [Segment.VENDORS_ALLOWED]: [
        Fields.vendorsAllowed
      ],
      [Segment.VENDORS_DISCLOSED]: [
        Fields.vendorsDisclosed
      ]
    };
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/sequence/SegmentSequence.js
  var SegmentSequence = class {
    "1" = [
      Segment.CORE
    ];
    "2" = [
      Segment.CORE
    ];
    constructor(tcModel, options) {
      if (tcModel.version === 2) {
        if (tcModel.isServiceSpecific) {
          this["2"].push(Segment.PUBLISHER_TC);
        } else {
          const isForVendors = !!(options && options.isForVendors);
          if (!isForVendors || tcModel[Fields.supportOOB] === true) {
            this["2"].push(Segment.VENDORS_DISCLOSED);
          }
          if (isForVendors) {
            if (tcModel[Fields.supportOOB] && tcModel[Fields.vendorsAllowed].size > 0) {
              this["2"].push(Segment.VENDORS_ALLOWED);
            }
            this["2"].push(Segment.PUBLISHER_TC);
          }
        }
      }
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/SegmentEncoder.js
  var SegmentEncoder = class {
    static fieldSequence = new FieldSequence();
    static encode(tcModel, segment) {
      let sequence;
      try {
        sequence = this.fieldSequence[String(tcModel.version)][segment];
      } catch (err) {
        throw new EncodingError(`Unable to encode version: ${tcModel.version}, segment: ${segment}`);
      }
      let bitField = "";
      if (segment !== Segment.CORE) {
        bitField = IntEncoder.encode(SegmentIDs.KEY_TO_ID[segment], BitLength.segmentType);
      }
      const fieldEncoderMap = FieldEncoderMap();
      sequence.forEach((key) => {
        const value = tcModel[key];
        const encoder = fieldEncoderMap[key];
        let numBits = BitLength[key];
        if (numBits === void 0) {
          if (this.isPublisherCustom(key)) {
            numBits = Number(tcModel[Fields.numCustomPurposes]);
          }
        }
        try {
          bitField += encoder.encode(value, numBits);
        } catch (err) {
          throw new EncodingError(`Error encoding ${segment}->${key}: ${err.message}`);
        }
      });
      return Base64Url.encode(bitField);
    }
    static decode(encodedString, tcModel, segment) {
      const bitField = Base64Url.decode(encodedString);
      let bStringIdx = 0;
      if (segment === Segment.CORE) {
        tcModel.version = IntEncoder.decode(bitField.substr(bStringIdx, BitLength[Fields.version]), BitLength[Fields.version]);
      }
      if (segment !== Segment.CORE) {
        bStringIdx += BitLength.segmentType;
      }
      const sequence = this.fieldSequence[String(tcModel.version)][segment];
      const fieldEncoderMap = FieldEncoderMap();
      sequence.forEach((key) => {
        const encoder = fieldEncoderMap[key];
        let numBits = BitLength[key];
        if (numBits === void 0) {
          if (this.isPublisherCustom(key)) {
            numBits = Number(tcModel[Fields.numCustomPurposes]);
          }
        }
        if (numBits !== 0) {
          const bits = bitField.substr(bStringIdx, numBits);
          if (encoder === VendorVectorEncoder) {
            tcModel[key] = encoder.decode(bits, tcModel.version);
          } else {
            tcModel[key] = encoder.decode(bits, numBits);
          }
          if (Number.isInteger(numBits)) {
            bStringIdx += numBits;
          } else if (Number.isInteger(tcModel[key].bitLength)) {
            bStringIdx += tcModel[key].bitLength;
          } else {
            throw new DecodingError(key);
          }
        }
      });
      return tcModel;
    }
    static isPublisherCustom(key) {
      return key.indexOf("publisherCustom") === 0;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/encoder/SemanticPreEncoder.js
  var SemanticPreEncoder = class {
    static processor = [
      (tcModel) => tcModel,
      (tcModel, gvl) => {
        tcModel.publisherRestrictions.gvl = gvl;
        tcModel.purposeLegitimateInterests.unset(1);
        const vectorToIntMap = /* @__PURE__ */ new Map();
        vectorToIntMap.set("legIntPurposes", tcModel.vendorLegitimateInterests);
        vectorToIntMap.set("purposes", tcModel.vendorConsents);
        vectorToIntMap.forEach((vector, gvlVendorKey) => {
          vector.forEach((value, vendorId) => {
            if (value) {
              const vendor = gvl.vendors[vendorId];
              if (!vendor || vendor.deletedDate) {
                vector.unset(vendorId);
              } else if (vendor[gvlVendorKey].length === 0) {
                if (gvlVendorKey === "legIntPurposes" && vendor["purposes"].length === 0 && vendor["legIntPurposes"].length === 0 && vendor["specialPurposes"].length > 0) {
                } else {
                  if (tcModel.isServiceSpecific) {
                    if (vendor.flexiblePurposes.length === 0) {
                      vector.unset(vendorId);
                    } else {
                      const restrictions = tcModel.publisherRestrictions.getRestrictions(vendorId);
                      let isValid = false;
                      for (let i = 0, len = restrictions.length; i < len && !isValid; i++) {
                        isValid = restrictions[i].restrictionType === RestrictionType.REQUIRE_CONSENT && gvlVendorKey === "purposes" || restrictions[i].restrictionType === RestrictionType.REQUIRE_LI && gvlVendorKey === "legIntPurposes";
                      }
                      if (!isValid) {
                        vector.unset(vendorId);
                      }
                    }
                  } else {
                    vector.unset(vendorId);
                  }
                }
              }
            }
          });
        });
        tcModel.vendorsDisclosed.set(gvl.vendors);
        return tcModel;
      }
    ];
    static process(tcModel, options) {
      const gvl = tcModel.gvl;
      if (!gvl) {
        throw new EncodingError("Unable to encode TCModel without a GVL");
      }
      if (!gvl.isReady) {
        throw new EncodingError("Unable to encode TCModel tcModel.gvl.readyPromise is not resolved");
      }
      tcModel = tcModel.clone();
      tcModel.consentLanguage = gvl.language.toUpperCase();
      if (options?.version > 0 && options?.version <= this.processor.length) {
        tcModel.version = options.version;
      } else {
        tcModel.version = this.processor.length;
      }
      const processorFunctionIndex = tcModel.version - 1;
      if (!this.processor[processorFunctionIndex]) {
        throw new EncodingError(`Invalid version: ${tcModel.version}`);
      }
      return this.processor[processorFunctionIndex](tcModel, gvl);
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/Json.js
  var Json = class {
    static absCall(url, body, sendCookies, timeout) {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        const onLoad = () => {
          if (req.readyState == XMLHttpRequest.DONE) {
            if (req.status >= 200 && req.status < 300) {
              let response = req.response;
              if (typeof response === "string") {
                try {
                  response = JSON.parse(response);
                } catch (e) {
                }
              }
              resolve(response);
            } else {
              reject(new Error(`HTTP Status: ${req.status} response type: ${req.responseType}`));
            }
          }
        };
        const onError = () => {
          reject(new Error("error"));
        };
        const onAbort = () => {
          reject(new Error("aborted"));
        };
        const onTimeout = () => {
          reject(new Error("Timeout " + timeout + "ms " + url));
        };
        req.withCredentials = sendCookies;
        req.addEventListener("load", onLoad);
        req.addEventListener("error", onError);
        req.addEventListener("abort", onAbort);
        if (body === null) {
          req.open("GET", url, true);
        } else {
          req.open("POST", url, true);
        }
        req.responseType = "json";
        req.timeout = timeout;
        req.ontimeout = onTimeout;
        req.send(body);
      });
    }
    /**
     * @static
     * @param {string} url - full path to POST to
     * @param {object} body - JSON object to post
     * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
     * @param {number} [timeout] - optional timeout in milliseconds
     * @return {Promise<object>} - if the server responds the response will be returned here
     */
    static post(url, body, sendCookies = false, timeout = 0) {
      return this.absCall(url, JSON.stringify(body), sendCookies, timeout);
    }
    /**
     * @static
     * @param {string} url - full path to the json
     * @param {boolean} sendCookies - Whether or not to send the XMLHttpRequest with credentials or not
     * @param {number} [timeout] - optional timeout in milliseconds
     * @return {Promise<object>} - resolves with parsed JSON
     */
    static fetch(url, sendCookies = false, timeout = 0) {
      return this.absCall(url, null, sendCookies, timeout);
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/GVL.js
  var GVL = class _GVL extends Cloneable {
    static LANGUAGE_CACHE = /* @__PURE__ */ new Map();
    static CACHE = /* @__PURE__ */ new Map();
    static LATEST_CACHE_KEY = 0;
    static DEFAULT_LANGUAGE = "EN";
    /**
     * Set of available consent languages published by the IAB
     */
    static consentLanguages = new ConsentLanguages();
    static baseUrl_;
    /**
     * baseUrl - Entities using the vendor-list.json are required by the iab to
     * host their own copy of it to reduce the load on the iab's infrastructure
     * so a 'base' url must be set to be put together with the versioning scheme
     * of the filenames.
     *
     * @static
     * @param {string} url - the base url to load the vendor-list.json from.  This is
     * broken out from the filename because it follows a different scheme for
     * latest file vs versioned files.
     *
     * @throws {GVLError} - If the url is http[s]://vendorlist.consensu.org/...
     * this will throw an error.  IAB Europe requires that that CMPs and Vendors
     * cache their own copies of the GVL to minimize load on their
     * infrastructure.  For more information regarding caching of the
     * vendor-list.json, please see [the TCF documentation on 'Caching the Global
     * Vendor List'
     * ](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#caching-the-global-vendor-list)
     */
    static set baseUrl(url) {
      const notValid = /^https?:\/\/vendorlist\.consensu\.org\//;
      if (notValid.test(url)) {
        throw new GVLError("Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache");
      }
      if (url.length > 0 && url[url.length - 1] !== "/") {
        url += "/";
      }
      this.baseUrl_ = url;
    }
    /**
     * baseUrl - Entities using the vendor-list.json are required by the iab to
     * host their own copy of it to reduce the load on the iab's infrastructure
     * so a 'base' url must be set to be put together with the versioning scheme
     * of the filenames.
     *
     * @static
     * @return {string} - returns the previously set baseUrl, the default is
     * `undefined`
     */
    static get baseUrl() {
      return this.baseUrl_;
    }
    /**
     * @static
     * @param {string} - the latest is assumed to be vendor-list.json because
     * that is what the iab uses, but it could be different... if you want
     */
    static latestFilename = "vendor-list.json";
    /**
     * @static
     * @param {string} - the versioned name is assumed to be
     * vendor-list-v[VERSION].json where [VERSION] will be replaced with the
     * specified version.  But it could be different... if you want just make
     * sure to include the [VERSION] macro if you have a numbering scheme, it's a
     * simple string substitution.
     *
     * eg.
     * ```javascript
     * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
     * GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
     * ```
     */
    static versionedFilename = "archives/vendor-list-v[VERSION].json";
    /**
     * @param {string} - Translations of the names and descriptions for Purposes,
     * Special Purposes, Features, and Special Features to non-English languages
     * are contained in a file where attributes containing English content
     * (except vendor declaration information) are translated.  The iab publishes
     * one following the scheme below where the LANG is the iso639-1 language
     * code.  For a list of available translations
     * [please go here](https://register.consensu.org/Translation).
     *
     * eg.
     * ```javascript
     * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
     * GVL.languageFilename = "purposes?getPurposes=[LANG]";
     * ```
     */
    static languageFilename = "purposes-[LANG].json";
    /**
     * @param {Promise} resolved when this GVL object is populated with the data
     * or rejected if there is an error.
     */
    readyPromise;
    /**
     * @param {number} gvlSpecificationVersion - schema version for the GVL that is used
     */
    gvlSpecificationVersion;
    /**
     * @param {number} incremented with each published file change
     */
    vendorListVersion;
    /**
     * @param {number} tcfPolicyVersion - The TCF MO will increment this value
     * whenever a GVL change (such as adding a new Purpose or Feature or a change
     * in Purpose wording) legally invalidates existing TC Strings and requires
     * CMPs to re-establish transparency and consent from users. If the policy
     * version number in the latest GVL is different from the value in your TC
     * String, then you need to re-establish transparency and consent for that
     * user. A version 1 format TC String is considered to have a version value
     * of 1.
     */
    tcfPolicyVersion;
    /**
     * @param {string | Date} lastUpdated - the date in which the vendor list
     * json file  was last updated.
     */
    lastUpdated;
    /**
     * @param {IntMap<Purpose>} a collection of [[Purpose]]s
     */
    purposes;
    /**
     * @param {IntMap<Purpose>} a collection of [[Purpose]]s
     */
    specialPurposes;
    /**
     * @param {IntMap<Feature>} a collection of [[Feature]]s
     */
    features;
    /**
     * @param {IntMap<Feature>} a collection of [[Feature]]s
     */
    specialFeatures;
    /**
     * @param {boolean} internal reference of when the GVL is ready to be used
     */
    isReady_ = false;
    /**
     * @param {IntMap<Vendor>} a collection of [[Vendor]]s
     */
    vendors_;
    vendorIds;
    /**
     * @param {IntMap<Vendor>} a collection of [[Vendor]]. Used as a backup if a whitelist is sets
     */
    fullVendorList;
    /**
     * @param {ByPurposeVendorMap} vendors by purpose
     */
    byPurposeVendorMap;
    /**
     * @param {IDSetMap} vendors by special purpose
     */
    bySpecialPurposeVendorMap;
    /**
     * @param {IDSetMap} vendors by feature
     */
    byFeatureVendorMap;
    /**
     * @param {IDSetMap} vendors by special feature
     */
    bySpecialFeatureVendorMap;
    /**
     * @param {IntMap<Stack>} a collection of [[Stack]]s
     */
    stacks;
    lang_;
    isLatest = false;
    /**
     * @param {VersionOrVendorList} [versionOrVendorList] - can be either a
     * [[VendorList]] object or a version number represented as a string or
     * number to download.  If nothing is passed the latest version of the GVL
     * will be loaded
     */
    constructor(versionOrVendorList) {
      super();
      let url = _GVL.baseUrl;
      this.lang_ = _GVL.DEFAULT_LANGUAGE;
      if (this.isVendorList(versionOrVendorList)) {
        this.populate(versionOrVendorList);
        this.readyPromise = Promise.resolve();
      } else {
        if (!url) {
          throw new GVLError("must specify GVL.baseUrl before loading GVL json");
        }
        if (versionOrVendorList > 0) {
          const version = versionOrVendorList;
          if (_GVL.CACHE.has(version)) {
            this.populate(_GVL.CACHE.get(version));
            this.readyPromise = Promise.resolve();
          } else {
            url += _GVL.versionedFilename.replace("[VERSION]", String(version));
            this.readyPromise = this.fetchJson(url);
          }
        } else {
          if (_GVL.CACHE.has(_GVL.LATEST_CACHE_KEY)) {
            this.populate(_GVL.CACHE.get(_GVL.LATEST_CACHE_KEY));
            this.readyPromise = Promise.resolve();
          } else {
            this.isLatest = true;
            this.readyPromise = this.fetchJson(url + _GVL.latestFilename);
          }
        }
      }
    }
    /**
     * emptyLanguageCache
     *
     * @param {string} [lang] - Optional ISO 639-1 langauge code to remove from
     * the cache.  Should be one of the languages in GVL.consentLanguages set.
     * If not then the whole cache will be deleted.
     * @return {boolean} - true if anything was deleted from the cache
     */
    static emptyLanguageCache(lang) {
      let retr = false;
      if (lang === void 0 && _GVL.LANGUAGE_CACHE.size > 0) {
        _GVL.LANGUAGE_CACHE = /* @__PURE__ */ new Map();
        retr = true;
      } else if (typeof lang === "string" && this.consentLanguages.has(lang.toUpperCase())) {
        _GVL.LANGUAGE_CACHE.delete(lang.toUpperCase());
        retr = true;
      }
      return retr;
    }
    /**
     * emptyCache
     *
     * @param {number} [vendorListVersion] - version of the vendor list to delete
     * from the cache.  If none is specified then the whole cache is deleted.
     * @return {boolean} - true if anything was deleted from the cache
     */
    static emptyCache(vendorListVersion) {
      let retr = false;
      if (Number.isInteger(vendorListVersion) && vendorListVersion >= 0) {
        _GVL.CACHE.delete(vendorListVersion);
        retr = true;
      } else if (vendorListVersion === void 0) {
        _GVL.CACHE = /* @__PURE__ */ new Map();
        retr = true;
      }
      return retr;
    }
    cacheLanguage() {
      if (!_GVL.LANGUAGE_CACHE.has(this.lang_)) {
        _GVL.LANGUAGE_CACHE.set(this.lang_, {
          purposes: this.purposes,
          specialPurposes: this.specialPurposes,
          features: this.features,
          specialFeatures: this.specialFeatures,
          stacks: this.stacks
        });
      }
    }
    async fetchJson(url) {
      try {
        this.populate(await Json.fetch(url));
      } catch (err) {
        throw new GVLError(err.message);
      }
    }
    /**
     * getJson - Method for getting the JSON that was downloaded to created this
     * `GVL` object
     *
     * @return {VendorList} - The basic JSON structure without the extra
     * functionality and methods of this class.
     */
    getJson() {
      return JSON.parse(JSON.stringify({
        gvlSpecificationVersion: this.gvlSpecificationVersion,
        vendorListVersion: this.vendorListVersion,
        tcfPolicyVersion: this.tcfPolicyVersion,
        lastUpdated: this.lastUpdated,
        purposes: this.purposes,
        specialPurposes: this.specialPurposes,
        features: this.features,
        specialFeatures: this.specialFeatures,
        stacks: this.stacks,
        vendors: this.fullVendorList
      }));
    }
    /**
     * changeLanguage - retrieves the purpose language translation and sets the
     * internal language variable
     *
     * @param {string} lang - ISO 639-1 langauge code to change language to
     * @return {Promise<void | GVLError>} - returns the `readyPromise` and
     * resolves when this GVL is populated with the data from the language file.
     */
    async changeLanguage(lang) {
      const langUpper = lang.toUpperCase();
      if (_GVL.consentLanguages.has(langUpper)) {
        if (langUpper !== this.lang_) {
          this.lang_ = langUpper;
          if (_GVL.LANGUAGE_CACHE.has(langUpper)) {
            const cached = _GVL.LANGUAGE_CACHE.get(langUpper);
            for (const prop in cached) {
              if (cached.hasOwnProperty(prop)) {
                this[prop] = cached[prop];
              }
            }
          } else {
            const url = _GVL.baseUrl + _GVL.languageFilename.replace("[LANG]", lang);
            try {
              await this.fetchJson(url);
              this.cacheLanguage();
            } catch (err) {
              throw new GVLError("unable to load language: " + err.message);
            }
          }
        }
      } else {
        throw new GVLError(`unsupported language ${lang}`);
      }
    }
    get language() {
      return this.lang_;
    }
    isVendorList(gvlObject) {
      return gvlObject !== void 0 && gvlObject.vendors !== void 0;
    }
    populate(gvlObject) {
      this.purposes = gvlObject.purposes;
      this.specialPurposes = gvlObject.specialPurposes;
      this.features = gvlObject.features;
      this.specialFeatures = gvlObject.specialFeatures;
      this.stacks = gvlObject.stacks;
      if (this.isVendorList(gvlObject)) {
        this.gvlSpecificationVersion = gvlObject.gvlSpecificationVersion;
        this.tcfPolicyVersion = gvlObject.tcfPolicyVersion;
        this.vendorListVersion = gvlObject.vendorListVersion;
        this.lastUpdated = gvlObject.lastUpdated;
        if (typeof this.lastUpdated === "string") {
          this.lastUpdated = new Date(this.lastUpdated);
        }
        this.vendors_ = gvlObject.vendors;
        this.fullVendorList = gvlObject.vendors;
        this.mapVendors();
        this.isReady_ = true;
        if (this.isLatest) {
          _GVL.CACHE.set(_GVL.LATEST_CACHE_KEY, this.getJson());
        }
        if (!_GVL.CACHE.has(this.vendorListVersion)) {
          _GVL.CACHE.set(this.vendorListVersion, this.getJson());
        }
      }
      this.cacheLanguage();
    }
    mapVendors(vendorIds) {
      this.byPurposeVendorMap = {};
      this.bySpecialPurposeVendorMap = {};
      this.byFeatureVendorMap = {};
      this.bySpecialFeatureVendorMap = {};
      Object.keys(this.purposes).forEach((purposeId) => {
        this.byPurposeVendorMap[purposeId] = {
          legInt: /* @__PURE__ */ new Set(),
          consent: /* @__PURE__ */ new Set(),
          flexible: /* @__PURE__ */ new Set()
        };
      });
      Object.keys(this.specialPurposes).forEach((purposeId) => {
        this.bySpecialPurposeVendorMap[purposeId] = /* @__PURE__ */ new Set();
      });
      Object.keys(this.features).forEach((featureId) => {
        this.byFeatureVendorMap[featureId] = /* @__PURE__ */ new Set();
      });
      Object.keys(this.specialFeatures).forEach((featureId) => {
        this.bySpecialFeatureVendorMap[featureId] = /* @__PURE__ */ new Set();
      });
      if (!Array.isArray(vendorIds)) {
        vendorIds = Object.keys(this.fullVendorList).map((vId) => +vId);
      }
      this.vendorIds = new Set(vendorIds);
      this.vendors_ = vendorIds.reduce((vendors, vendorId) => {
        const vendor = this.vendors_[String(vendorId)];
        if (vendor && vendor.deletedDate === void 0) {
          vendor.purposes.forEach((purposeId) => {
            const purpGroup = this.byPurposeVendorMap[String(purposeId)];
            purpGroup.consent.add(vendorId);
          });
          vendor.specialPurposes.forEach((purposeId) => {
            this.bySpecialPurposeVendorMap[String(purposeId)].add(vendorId);
          });
          vendor.legIntPurposes.forEach((purposeId) => {
            this.byPurposeVendorMap[String(purposeId)].legInt.add(vendorId);
          });
          if (vendor.flexiblePurposes) {
            vendor.flexiblePurposes.forEach((purposeId) => {
              this.byPurposeVendorMap[String(purposeId)].flexible.add(vendorId);
            });
          }
          vendor.features.forEach((featureId) => {
            this.byFeatureVendorMap[String(featureId)].add(vendorId);
          });
          vendor.specialFeatures.forEach((featureId) => {
            this.bySpecialFeatureVendorMap[String(featureId)].add(vendorId);
          });
          vendors[vendorId] = vendor;
        }
        return vendors;
      }, {});
    }
    getFilteredVendors(purposeOrFeature, id, subType, special) {
      const properPurposeOrFeature = purposeOrFeature.charAt(0).toUpperCase() + purposeOrFeature.slice(1);
      let vendorSet;
      const retr = {};
      if (purposeOrFeature === "purpose" && subType) {
        vendorSet = this["by" + properPurposeOrFeature + "VendorMap"][String(id)][subType];
      } else {
        vendorSet = this["by" + (special ? "Special" : "") + properPurposeOrFeature + "VendorMap"][String(id)];
      }
      vendorSet.forEach((vendorId) => {
        retr[String(vendorId)] = this.vendors[String(vendorId)];
      });
      return retr;
    }
    /**
     * getVendorsWithConsentPurpose
     *
     * @param {number} purposeId
     * @return {IntMap<Vendor>} - list of vendors that have declared the consent purpose id
     */
    getVendorsWithConsentPurpose(purposeId) {
      return this.getFilteredVendors("purpose", purposeId, "consent");
    }
    /**
     * getVendorsWithLegIntPurpose
     *
     * @param {number} purposeId
     * @return {IntMap<Vendor>} - list of vendors that have declared the legInt (Legitimate Interest) purpose id
     */
    getVendorsWithLegIntPurpose(purposeId) {
      return this.getFilteredVendors("purpose", purposeId, "legInt");
    }
    /**
     * getVendorsWithFlexiblePurpose
     *
     * @param {number} purposeId
     * @return {IntMap<Vendor>} - list of vendors that have declared the flexible purpose id
     */
    getVendorsWithFlexiblePurpose(purposeId) {
      return this.getFilteredVendors("purpose", purposeId, "flexible");
    }
    /**
     * getVendorsWithSpecialPurpose
     *
     * @param {number} specialPurposeId
     * @return {IntMap<Vendor>} - list of vendors that have declared the special purpose id
     */
    getVendorsWithSpecialPurpose(specialPurposeId) {
      return this.getFilteredVendors("purpose", specialPurposeId, void 0, true);
    }
    /**
     * getVendorsWithFeature
     *
     * @param {number} featureId
     * @return {IntMap<Vendor>} - list of vendors that have declared the feature id
     */
    getVendorsWithFeature(featureId) {
      return this.getFilteredVendors("feature", featureId);
    }
    /**
     * getVendorsWithSpecialFeature
     *
     * @param {number} specialFeatureId
     * @return {IntMap<Vendor>} - list of vendors that have declared the special feature id
     */
    getVendorsWithSpecialFeature(specialFeatureId) {
      return this.getFilteredVendors("feature", specialFeatureId, void 0, true);
    }
    /**
     * vendors
     *
     * @return {IntMap<Vendor>} - the list of vendors as it would on the JSON file
     * except if `narrowVendorsTo` was called, it would be that narrowed list
     */
    get vendors() {
      return this.vendors_;
    }
    /**
     * narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in
     *
     * @param {number[]} vendorIds - list of ids to narrow this GVL to
     * @return {void}
     */
    narrowVendorsTo(vendorIds) {
      this.mapVendors(vendorIds);
    }
    /**
     * isReady - Whether or not this instance is ready to be used.  This will be
     * immediately and synchronously true if a vendorlist object is passed into
     * the constructor or once the JSON vendorllist is retrieved.
     *
     * @return {boolean} whether or not the instance is ready to be interacted
     * with and all the data is populated
     */
    get isReady() {
      return this.isReady_;
    }
    /**
     * clone - overrides base `clone()` method since GVL is a special class that
     * represents a JSON structure with some additional functionality.
     *
     * @return {GVL}
     */
    clone() {
      const result = new _GVL(this.getJson());
      if (this.lang_ !== _GVL.DEFAULT_LANGUAGE) {
        result.changeLanguage(this.lang_);
      }
      return result;
    }
    static isInstanceOf(questionableInstance) {
      const isSo = typeof questionableInstance === "object";
      return isSo && typeof questionableInstance.narrowVendorsTo === "function";
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/TCModel.js
  var TCModel = class extends Cloneable {
    /**
     * Set of available consent languages published by the IAB
     */
    static consentLanguages = GVL.consentLanguages;
    isServiceSpecific_ = false;
    supportOOB_ = true;
    useNonStandardStacks_ = false;
    purposeOneTreatment_ = false;
    publisherCountryCode_ = "AA";
    version_ = 2;
    consentScreen_ = 0;
    policyVersion_ = 2;
    consentLanguage_ = "EN";
    cmpId_ = 0;
    cmpVersion_ = 0;
    vendorListVersion_ = 0;
    numCustomPurposes_ = 0;
    // Member Variable for GVL
    gvl_;
    created;
    lastUpdated;
    /**
     * The TCF designates certain Features as special, that is, a CMP must afford
     * the user a means to opt in to their use. These Special Features are
     * published and numbered in the GVL separately from normal Features.
     * Provides for up to 12 special features.
     */
    specialFeatureOptins = new Vector();
    /**
     * Renamed from `PurposesAllowed` in TCF v1.1
     * The user’s consent value for each Purpose established on the legal basis
     * of consent. Purposes are published in the Global Vendor List (see. [[GVL]]).
     */
    purposeConsents = new Vector();
    /**
     * The user’s permission for each Purpose established on the legal basis of
     * legitimate interest. If the user has exercised right-to-object for a
     * purpose.
     */
    purposeLegitimateInterests = new Vector();
    /**
     * The user’s consent value for each Purpose established on the legal basis
     * of consent, for the publisher.  Purposes are published in the Global
     * Vendor List.
     */
    publisherConsents = new Vector();
    /**
     * The user’s permission for each Purpose established on the legal basis of
     * legitimate interest.  If the user has exercised right-to-object for a
     * purpose.
     */
    publisherLegitimateInterests = new Vector();
    /**
     * The user’s consent value for each Purpose established on the legal basis
     * of consent, for the publisher.  Purposes are published in the Global
     * Vendor List.
     */
    publisherCustomConsents = new Vector();
    /**
     * The user’s permission for each Purpose established on the legal basis of
     * legitimate interest.  If the user has exercised right-to-object for a
     * purpose that is established in the publisher's custom purposes.
     */
    publisherCustomLegitimateInterests = new Vector();
    /**
     * set by a publisher if they wish to collect consent and LI Transparency for
     * purposes outside of the TCF
     */
    customPurposes;
    /**
     * Each [[Vendor]] is keyed by id. Their consent value is true if it is in
     * the Vector
     */
    vendorConsents = new Vector();
    /**
     * Each [[Vendor]] is keyed by id. Whether their Legitimate Interests
     * Disclosures have been established is stored as boolean.
     * see: [[Vector]]
     */
    vendorLegitimateInterests = new Vector();
    /**
     * The value included for disclosed vendors signals which vendors have been
     * disclosed to the user in the interface surfaced by the CMP. This section
     * content is required when writing a TC string to the global (consensu)
     * scope. When a CMP has read from and is updating a TC string from the
     * global consensu.org storage, the CMP MUST retain the existing disclosure
     * information and only add information for vendors that it has disclosed
     * that had not been disclosed by other CMPs in prior interactions with this
     * device/user agent.
     */
    vendorsDisclosed = new Vector();
    /**
     * Signals which vendors the publisher permits to use OOB legal bases.
     */
    vendorsAllowed = new Vector();
    publisherRestrictions = new PurposeRestrictionVector();
    /**
     * Constructs the TCModel. Passing a [[GVL]] is optional when constructing
     * as this TCModel may be constructed from decoding an existing encoded
     * TCString.
     *
     * @param {GVL} [gvl]
     */
    constructor(gvl) {
      super();
      if (gvl) {
        this.gvl = gvl;
      }
      this.updated();
    }
    /**
     * sets the [[GVL]] with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`
     * @param {GVL} gvl
     */
    set gvl(gvl) {
      if (!GVL.isInstanceOf(gvl)) {
        gvl = new GVL(gvl);
      }
      this.gvl_ = gvl;
      this.publisherRestrictions.gvl = gvl;
    }
    /**
     * @return {GVL} the gvl instance set on this TCModel instance
     */
    get gvl() {
      return this.gvl_;
    }
    /**
     * @param {number} integer - A unique ID will be assigned to each Consent
     * Manager Provider (CMP) from the iab.
     *
     * @throws {TCModelError} if the value is not an integer greater than 1 as those are not valid.
     */
    set cmpId(integer) {
      integer = Number(integer);
      if (Number.isInteger(integer) && integer > 1) {
        this.cmpId_ = integer;
      } else {
        throw new TCModelError("cmpId", integer);
      }
    }
    get cmpId() {
      return this.cmpId_;
    }
    /**
     * Each change to an operating CMP should receive a
     * new version number, for logging proof of consent. CmpVersion defined by
     * each CMP.
     *
     * @param {number} integer
     *
     * @throws {TCModelError} if the value is not an integer greater than 1 as those are not valid.
     */
    set cmpVersion(integer) {
      integer = Number(integer);
      if (Number.isInteger(integer) && integer > -1) {
        this.cmpVersion_ = integer;
      } else {
        throw new TCModelError("cmpVersion", integer);
      }
    }
    get cmpVersion() {
      return this.cmpVersion_;
    }
    /**
     * The screen number is CMP and CmpVersion
     * specific, and is for logging proof of consent.(For example, a CMP could
     * keep records so that a publisher can request information about the context
     * in which consent was gathered.)
     *
     * @param {number} integer
     *
     * @throws {TCModelError} if the value is not an integer greater than 0 as those are not valid.
     */
    set consentScreen(integer) {
      integer = Number(integer);
      if (Number.isInteger(integer) && integer > -1) {
        this.consentScreen_ = integer;
      } else {
        throw new TCModelError("consentScreen", integer);
      }
    }
    get consentScreen() {
      return this.consentScreen_;
    }
    /**
     * @param {string} lang - [two-letter ISO 639-1 language
     * code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which
     * the CMP UI was presented
     *
     * @throws {TCModelError} if the value is not a length-2 string of alpha characters
     */
    set consentLanguage(lang) {
      this.consentLanguage_ = lang;
    }
    get consentLanguage() {
      return this.consentLanguage_;
    }
    /**
     * @param {string} countryCode - [two-letter ISO 3166-1 alpha-2 country
     * code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher,
     * determined by the CMP-settings of the publisher.
     *
     * @throws {TCModelError} if the value is not a length-2 string of alpha characters
     */
    set publisherCountryCode(countryCode) {
      if (/^([A-z]){2}$/.test(countryCode)) {
        this.publisherCountryCode_ = countryCode.toUpperCase();
      } else {
        throw new TCModelError("publisherCountryCode", countryCode);
      }
    }
    get publisherCountryCode() {
      return this.publisherCountryCode_;
    }
    /**
     * Version of the GVL used to create this TCModel. Global
     * Vendor List versions will be released periodically.
     *
     * @param {number} integer
     *
     * @throws {TCModelError} if the value is not an integer greater than 0 as those are not valid.
     */
    set vendorListVersion(integer) {
      integer = Number(integer) >> 0;
      if (integer < 0) {
        throw new TCModelError("vendorListVersion", integer);
      } else {
        this.vendorListVersion_ = integer;
      }
    }
    get vendorListVersion() {
      if (this.gvl) {
        return this.gvl.vendorListVersion;
      } else {
        return this.vendorListVersion_;
      }
    }
    /**
     * From the corresponding field in the GVL that was
     * used for obtaining consent. A new policy version invalidates existing
     * strings and requires CMPs to re-establish transparency and consent from
     * users.
     *
     * If a TCF policy version number is different from the one from the latest
     * GVL, the CMP must re-establish transparency and consent.
     *
     * @param {number} num - You do not need to set this.  This comes
     * directly from the [[GVL]].
     *
     */
    set policyVersion(num) {
      this.policyVersion_ = parseInt(num, 10);
      if (this.policyVersion_ < 0) {
        throw new TCModelError("policyVersion", num);
      }
    }
    get policyVersion() {
      if (this.gvl) {
        return this.gvl.tcfPolicyVersion;
      } else {
        return this.policyVersion_;
      }
    }
    set version(num) {
      this.version_ = parseInt(num, 10);
    }
    get version() {
      return this.version_;
    }
    /**
     * Whether the signals encoded in this TC String were from site-specific
     * storage `true` versus ‘global’ consensu.org shared storage `false`. A
     * string intended to be stored in global/shared scope but the CMP is unable
     * to store due to a user agent not accepting third-party cookies would be
     * considered site-specific `true`.
     *
     * @param {boolean} bool - value to set. Some changes to other fields in this
     * model will automatically change this value like adding publisher
     * restrictions.
     */
    set isServiceSpecific(bool) {
      this.isServiceSpecific_ = bool;
    }
    get isServiceSpecific() {
      return this.isServiceSpecific_;
    }
    /**
     * Non-standard stacks means that a CMP is using publisher-customized stack
     * descriptions. Stacks (in terms of purposes in a stack) are pre-set by the
     * IAB. As are titles. Descriptions are pre-set, but publishers can customize
     * them. If they do, they need to set this bit to indicate that they've
     * customized descriptions.
     *
     * @param {boolean} bool - value to set
     */
    set useNonStandardStacks(bool) {
      this.useNonStandardStacks_ = bool;
    }
    get useNonStandardStacks() {
      return this.useNonStandardStacks_;
    }
    /**
     * Whether or not this publisher supports OOB signaling.  On Global TC String
     * OOB Vendors Disclosed will be included if the publish wishes to no allow
     * these vendors they should set this to false.
     * @param {boolean} bool - value to set
     */
    set supportOOB(bool) {
      this.supportOOB_ = bool;
    }
    get supportOOB() {
      return this.supportOOB_;
    }
    /**
     * `false` There is no special Purpose 1 status.
     * Purpose 1 was disclosed normally (consent) as expected by Policy.  `true`
     * Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the
     * publisher’s country of establishment to help Vendors determine whether the
     * vendor requires Purpose 1 consent. In global scope TC strings, this field
     * must always have a value of `false`. When a CMP encounters a global scope
     * string with `purposeOneTreatment=true` then that string should be
     * considered invalid and the CMP must re-establish transparency and consent.
     *
     * @param {boolean} bool
     */
    set purposeOneTreatment(bool) {
      this.purposeOneTreatment_ = bool;
    }
    get purposeOneTreatment() {
      return this.purposeOneTreatment_;
    }
    /**
     * setAllVendorConsents - sets all vendors on the GVL Consent (true)
     *
     * @return {void}
     */
    setAllVendorConsents() {
      this.vendorConsents.set(this.gvl.vendors);
    }
    /**
     * unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)
     *
     * @return {void}
     */
    unsetAllVendorConsents() {
      this.vendorConsents.empty();
    }
    /**
     * setAllVendorsDisclosed - sets all vendors on the GVL Vendors Disclosed (true)
     *
     * @return {void}
     */
    setAllVendorsDisclosed() {
      this.vendorsDisclosed.set(this.gvl.vendors);
    }
    /**
     * unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)
     *
     * @return {void}
     */
    unsetAllVendorsDisclosed() {
      this.vendorsDisclosed.empty();
    }
    /**
     * setAllVendorsAllowed - sets all vendors on the GVL Consent (true)
     *
     * @return {void}
     */
    setAllVendorsAllowed() {
      this.vendorsAllowed.set(this.gvl.vendors);
    }
    /**
     * unsetAllVendorsAllowed - unsets all vendors on the GVL Consent (false)
     *
     * @return {void}
     */
    unsetAllVendorsAllowed() {
      this.vendorsAllowed.empty();
    }
    /**
     * setAllVendorLegitimateInterests - sets all vendors on the GVL LegitimateInterests (true)
     *
     * @return {void}
     */
    setAllVendorLegitimateInterests() {
      this.vendorLegitimateInterests.set(this.gvl.vendors);
    }
    /**
     * unsetAllVendorLegitimateInterests - unsets all vendors on the GVL LegitimateInterests (false)
     *
     * @return {void}
     */
    unsetAllVendorLegitimateInterests() {
      this.vendorLegitimateInterests.empty();
    }
    /**
     * setAllPurposeConsents - sets all purposes on the GVL Consent (true)
     *
     * @return {void}
     */
    setAllPurposeConsents() {
      this.purposeConsents.set(this.gvl.purposes);
    }
    /**
     * unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)
     *
     * @return {void}
     */
    unsetAllPurposeConsents() {
      this.purposeConsents.empty();
    }
    /**
     * setAllPurposeLegitimateInterests - sets all purposes on the GVL LI Transparency (true)
     *
     * @return {void}
     */
    setAllPurposeLegitimateInterests() {
      this.purposeLegitimateInterests.set(this.gvl.purposes);
    }
    /**
     * unsetAllPurposeLegitimateInterests - unsets all purposes on the GVL LI Transparency (false)
     *
     * @return {void}
     */
    unsetAllPurposeLegitimateInterests() {
      this.purposeLegitimateInterests.empty();
    }
    /**
     * setAllSpecialFeatureOptins - sets all special featuresOptins on the GVL (true)
     *
     * @return {void}
     */
    setAllSpecialFeatureOptins() {
      this.specialFeatureOptins.set(this.gvl.specialFeatures);
    }
    /**
     * unsetAllSpecialFeatureOptins - unsets all special featuresOptins on the GVL (true)
     *
     * @return {void}
     */
    unsetAllSpecialFeatureOptins() {
      this.specialFeatureOptins.empty();
    }
    setAll() {
      this.setAllVendorConsents();
      this.setAllPurposeLegitimateInterests();
      this.setAllSpecialFeatureOptins();
      this.setAllPurposeConsents();
      this.setAllVendorLegitimateInterests();
    }
    unsetAll() {
      this.unsetAllVendorConsents();
      this.unsetAllPurposeLegitimateInterests();
      this.unsetAllSpecialFeatureOptins();
      this.unsetAllPurposeConsents();
      this.unsetAllVendorLegitimateInterests();
    }
    get numCustomPurposes() {
      let len = this.numCustomPurposes_;
      if (typeof this.customPurposes === "object") {
        const purposeIds = Object.keys(this.customPurposes).sort((a, b) => Number(a) - Number(b));
        len = parseInt(purposeIds.pop(), 10);
      }
      return len;
    }
    set numCustomPurposes(num) {
      this.numCustomPurposes_ = parseInt(num, 10);
      if (this.numCustomPurposes_ < 0) {
        throw new TCModelError("numCustomPurposes", num);
      }
    }
    /**
     * updated - updates the created and lastUpdated dates with a 'now' day-level UTC timestamp
     *
     * @return {void}
     */
    updated() {
      const date = /* @__PURE__ */ new Date();
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
      this.created = utcDate;
      this.lastUpdated = utcDate;
    }
  };

  // node_modules/@iabtcf/core/lib/mjs/TCString.js
  var TCString = class {
    /**
     * encodes a model into a TCString
     *
     * @param {TCModel} tcModel - model to convert into encoded string
     * @param {EncodingOptions} options - for encoding options other than default
     * @return {string} - base64url encoded Transparency and Consent String
     */
    static encode(tcModel, options) {
      let out = "";
      let sequence;
      tcModel = SemanticPreEncoder.process(tcModel, options);
      if (Array.isArray(options?.segments)) {
        sequence = options.segments;
      } else {
        sequence = new SegmentSequence(tcModel, options)["" + tcModel.version];
      }
      sequence.forEach((segment, idx) => {
        let dotMaybe = "";
        if (idx < sequence.length - 1) {
          dotMaybe = ".";
        }
        out += SegmentEncoder.encode(tcModel, segment) + dotMaybe;
      });
      return out;
    }
    /**
     * Decodes a string into a TCModel
     *
     * @param {string} encodedTCString - base64url encoded Transparency and
     * Consent String to decode - can also be a single or group of segments of
     * the string
     * @param {string} [tcModel] - model to enhance with the information.  If
     * none is passed a new instance of TCModel will be created.
     * @return {TCModel} - Returns populated TCModel
     */
    static decode(encodedTCString, tcModel) {
      const segments = encodedTCString.split(".");
      const len = segments.length;
      if (!tcModel) {
        tcModel = new TCModel();
      }
      for (let i = 0; i < len; i++) {
        const segString = segments[i];
        const firstChar = Base64Url.decode(segString.charAt(0));
        const segTypeBits = firstChar.substr(0, BitLength.segmentType);
        const segment = SegmentIDs.ID_TO_KEY[IntEncoder.decode(segTypeBits, BitLength.segmentType).toString()];
        SegmentEncoder.decode(segString, tcModel, segment);
      }
      return tcModel;
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/GetVendorListCommand.js
  var GetVendorListCommand = class extends Command {
    respond() {
      const tcModel = CmpApiModel.tcModel;
      const tcModelVersion = tcModel.vendorListVersion;
      let gvl;
      if (this.param === void 0) {
        this.param = tcModelVersion;
      }
      if (this.param === tcModelVersion && tcModel.gvl) {
        gvl = tcModel.gvl;
      } else {
        gvl = new GVL(this.param);
      }
      gvl.readyPromise.then(() => {
        this.invokeCallback(gvl.getJson());
      });
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/AddEventListenerCommand.js
  var AddEventListenerCommand = class extends GetTCDataCommand {
    respond() {
      this.listenerId = CmpApiModel.eventQueue.add({
        callback: this.callback,
        param: this.param,
        next: this.next
      });
      super.respond();
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/RemoveEventListenerCommand.js
  var RemoveEventListenerCommand = class extends Command {
    respond() {
      this.invokeCallback(CmpApiModel.eventQueue.remove(this.param));
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/command/CommandMap.js
  var CommandMap = class {
    static [TCFCommand.PING] = PingCommand;
    static [TCFCommand.GET_TC_DATA] = GetTCDataCommand;
    static [TCFCommand.GET_IN_APP_TC_DATA] = GetInAppTCDataCommand;
    static [TCFCommand.GET_VENDOR_LIST] = GetVendorListCommand;
    static [TCFCommand.ADD_EVENT_LISTENER] = AddEventListenerCommand;
    static [TCFCommand.REMOVE_EVENT_LISTENER] = RemoveEventListenerCommand;
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/SupportedVersions.js
  var SupportedVersions = class {
    static set_ = /* @__PURE__ */ new Set([0, 2, void 0, null]);
    static has(value) {
      if (typeof value === "string") {
        value = Number(value);
      }
      return this.set_.has(value);
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/CallResponder.js
  var API_KEY = "__tcfapi";
  var CallResponder = class {
    callQueue;
    customCommands;
    constructor(customCommands) {
      if (customCommands) {
        let command = TCFCommand.ADD_EVENT_LISTENER;
        if (customCommands?.[command]) {
          throw new Error(`Built-In Custom Commmand for ${command} not allowed: Use ${TCFCommand.GET_TC_DATA} instead`);
        }
        command = TCFCommand.REMOVE_EVENT_LISTENER;
        if (customCommands?.[command]) {
          throw new Error(`Built-In Custom Commmand for ${command} not allowed`);
        }
        if (customCommands?.[TCFCommand.GET_TC_DATA]) {
          customCommands[TCFCommand.ADD_EVENT_LISTENER] = customCommands[TCFCommand.GET_TC_DATA];
          customCommands[TCFCommand.REMOVE_EVENT_LISTENER] = customCommands[TCFCommand.GET_TC_DATA];
        }
        this.customCommands = customCommands;
      }
      try {
        this.callQueue = window[API_KEY]() || [];
      } catch (err) {
        this.callQueue = [];
      } finally {
        window[API_KEY] = this.apiCall.bind(this);
        this.purgeQueuedCalls();
      }
    }
    /**
     * Handler for all page call commands
     * @param {string} command
     * @param {number} version
     * @param {CommandCallback} callback
     * @param {any} params
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiCall(command, version, callback, ...params) {
      if (typeof command !== "string") {
        callback(null, false);
      } else if (!SupportedVersions.has(version)) {
        callback(null, false);
      } else if (typeof callback !== "function") {
        throw new Error("invalid callback function");
      } else if (CmpApiModel.disabled) {
        callback(new Disabled(), false);
      } else if (!this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {
        callback(null, false);
      } else if (this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {
        this.customCommands[command](callback, ...params);
      } else if (command === TCFCommand.PING) {
        if (this.isCustomCommand(command)) {
          new CommandMap[command](this.customCommands[command], params[0], null, callback);
        } else {
          new CommandMap[command](callback, params[0]);
        }
      } else if (CmpApiModel.tcModel === void 0) {
        this.callQueue.push([command, version, callback, ...params]);
      } else if (this.isCustomCommand(command) && this.isBuiltInCommand(command)) {
        new CommandMap[command](this.customCommands[command], params[0], null, callback);
      } else {
        new CommandMap[command](callback, params[0]);
      }
    }
    /**
     * purgeQueuedCalls - if there have been calls that are queued up this method
     * will go through and call them in a FIFO order
     *
     * @return {void}
     */
    purgeQueuedCalls() {
      const queueCopy = this.callQueue;
      this.callQueue = [];
      queueCopy.forEach((args) => {
        window[API_KEY](...args);
      });
    }
    /**
     * Checks to see if the command exists in the set of custom commands
     *
     * @param {string} command - command to check
     * @return {boolean} - whether or not this command is a custom command
     */
    isCustomCommand(command) {
      return this.customCommands && typeof this.customCommands[command] === "function";
    }
    /**
     * Checks to see if the command exists in the set of TCF Commands
     *
     * @param {string} command - command to check
     * @return {boolean} - whether or not this command is a built-in command
     */
    isBuiltInCommand(command) {
      return CommandMap[command] !== void 0;
    }
  };

  // node_modules/@iabtcf/cmpapi/lib/mjs/CmpApi.js
  var CmpApi = class {
    callResponder;
    isServiceSpecific;
    numUpdates = 0;
    /**
     * @param {number} cmpId - IAB assigned CMP ID
     * @param {number} cmpVersion - integer version of the CMP
     * @param {boolean} isServiceSpecific - whether or not this cmp is configured to be service specific
     * @param {CustomCommands} [customCommands] - custom commands from the cmp
     */
    constructor(cmpId, cmpVersion, isServiceSpecific = false, customCommands) {
      this.throwIfInvalidInt(cmpId, "cmpId", 2);
      this.throwIfInvalidInt(cmpVersion, "cmpVersion", 0);
      CmpApiModel.cmpId = cmpId;
      CmpApiModel.cmpVersion = cmpVersion;
      CmpApiModel.tcfPolicyVersion = 2;
      this.isServiceSpecific = !!isServiceSpecific;
      this.callResponder = new CallResponder(customCommands);
    }
    throwIfInvalidInt(value, name, minValue) {
      if (!(typeof value === "number" && Number.isInteger(value) && value >= minValue)) {
        throw new Error(`Invalid ${name}: ${value}`);
      }
    }
    /**
     * update - When the state of a CMP changes this function should be called
     * with the updated tc string and whether or not the UI is visible or not
     *
     * @param {string|null} encodedTCString - set a string to signal that
     * gdprApplies and that an encoded tc string is being passed.  If GDPR does
     * not apply, set to null.
     * @param {boolean} uiVisible - default false.  set to true if the ui is
     * being shown with this tc string update, this will set the correct values
     * for eventStatus and displayStatus.
     * @return {void}
     */
    update(encodedTCString, uiVisible = false) {
      if (CmpApiModel.disabled) {
        throw new Error("CmpApi Disabled");
      }
      CmpApiModel.cmpStatus = CmpStatus.LOADED;
      if (uiVisible) {
        CmpApiModel.displayStatus = DisplayStatus.VISIBLE;
        CmpApiModel.eventStatus = EventStatus.CMP_UI_SHOWN;
      } else {
        if (CmpApiModel.tcModel === void 0) {
          CmpApiModel.displayStatus = DisplayStatus.DISABLED;
          CmpApiModel.eventStatus = EventStatus.TC_LOADED;
        } else {
          CmpApiModel.displayStatus = DisplayStatus.HIDDEN;
          CmpApiModel.eventStatus = EventStatus.USER_ACTION_COMPLETE;
        }
      }
      CmpApiModel.gdprApplies = encodedTCString !== null;
      if (!CmpApiModel.gdprApplies) {
        CmpApiModel.tcModel = null;
      } else {
        if (encodedTCString === "") {
          CmpApiModel.tcModel = new TCModel();
          CmpApiModel.tcModel.cmpId = CmpApiModel.cmpId;
          CmpApiModel.tcModel.cmpVersion = CmpApiModel.cmpVersion;
        } else {
          CmpApiModel.tcModel = TCString.decode(encodedTCString);
        }
        CmpApiModel.tcModel.isServiceSpecific = this.isServiceSpecific;
        CmpApiModel.tcfPolicyVersion = Number(CmpApiModel.tcModel.policyVersion);
        CmpApiModel.tcString = encodedTCString;
      }
      if (this.numUpdates === 0) {
        this.callResponder.purgeQueuedCalls();
      } else {
        CmpApiModel.eventQueue.exec();
      }
      this.numUpdates++;
    }
    /**
     * Disables the CmpApi from serving anything but ping and custom commands
     * Cannot be undone
     *
     * @return {void}
     */
    disable() {
      CmpApiModel.disabled = true;
      CmpApiModel.cmpStatus = CmpStatus.ERROR;
    }
  };

  // src/index.js
  var cmpstub = require_stub();
  cmpstub();
  function getUnixDate() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  function setCookieValue(key, val) {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1e3);
    let expires = "expires=" + d.toUTCString();
    val.path = "/";
    val.expires = expires;
    val.createDate = getUnixDate();
    document.cookie = key + "=" + JSON.stringify(val);
  }
  function getCookieValue(kea) {
    let name = kea + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return null;
  }
  var ConsentFlow = () => {
    let generateDate = "insert_date";
    let consentId = "insert_consent_id";
    let vendors = "insert_vendors";
    let vendorsAllowed = [];
    let iabVendorsAllowed = [];
    let purposes = {};
    let purposesAllowed = [];
    GVL.baseUrl = "https://static.consentflow.de/";
    let gvl_obj = new GVL();
    let cloed_gvl = gvl_obj.clone();
    let tcModel = new TCModel(gvl_obj);
    tcModel.cmpId = 99;
    tcModel.cmpVersion = 2;
    tcModel.consentScreen = 1;
    tcModel.isServiceSpecific = true;
    tcModel.UseNonStandardStacks = 0;
    const tcfCmpApi = new CmpApi(tcModel.cmpId, tcModel.cmpVersion, tcModel.isServiceSpecific);
    tcModel.gvl.readyPromise.then(() => {
      let allVendors = tcModel.gvl.getJson().vendors;
      let allePurposes = tcModel.gvl.getJson().purposes;
      purposes = allePurposes;
      if (!vendors)
        vendors = [];
      gvl_obj.narrowVendorsTo(getAllVendorsIds());
      if (!consentStatus()) {
        showBanner();
      } else {
        tcfCmpApi.update(getTcString(), false);
        loadPreferences();
        addScripts();
        insertSettingIcon();
      }
    });
    function createTcString() {
      if (tcModel) {
        return TCString.encode(tcModel);
      }
    }
    function showBanner() {
      tcfCmpApi.update("", true);
      let body = document.getElementsByTagName("body");
      let consentText = ' <div class="cst_container"><div class="cst_banner"><div class="cst_main_container"><div class="cst_head"><img src="%icon%" class="cst_image"><h4 class="cst_headline">%headline%</h4></div><div class="cst_body"><p class="cst_text">%info_text%</p><div class="cst_button_wrap"><a class="cst_accept">%accept%</a><a class="cst_reject">%reject%</a><a id="cst_settings" class="cst_settings">%settings%</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="%imprint%">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div><div class="cst_settings_container"><div class="cst_head"><h4 class="cst_headline">%settings_headline%</h4></div><div class="cst_body"><div class="cst_scroll">%purposes%<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">Erforderlich</h5><p class="cst_reason_p">The technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user, or for the sole purpose of carrying out the transmission of a communication over an electronic communications network.</p></div></div><a class="cst_link" id="cst_vendor_settings">%vendor_settings%</a></div><div class="cst_button_wrap"><a class="cst_accept">%accept%</a><a class="cst_reject">%reject%</a><a id="cst_settings" class="cst_settings cst_save_settings">%save_settings%</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="%imprint%">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div><div class="cst_vendors_container"><div class="cst_head"><h4 class="cst_headline">%vendor_headline%</h4></div><div class="cst_body"><div class="cst_scroll">%vendors%<a class="cst_link" id="cst_reason_settings">%purpose_settings%</a></div><div class="cst_button_wrap"><a class="cst_accept">%accept%</a><a class="cst_reject">%reject%</a><a id="cst_settings" class="cst_settings cst_save_settings">%save_settings%</a></div><div class="cst_button_wrap"><a class="cst_link">Mehr Infos</a><a class="cst_link" href="%imprint%">Impressum</a><a class="cst_link" href="%privacy%">Datenschutz</a></div></div></div></div></div>';
      let purposeText = "";
      for (const [key, value] of Object.entries(purposes)) {
        purposeText = purposeText + '<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">' + value.name + '</h5><p class="cst_reason_p">' + value.description + '</p></div><div class="cst_reason_consent_container"><label class="cst_reason_consent_switch"><input type="checkbox" class="cst_reason_consent_checkbox" value_id="' + value.id + ' purpose"><span class="cst_reason_consent_slider"></span></label></div></div>';
      }
      consentText = consentText.replace("%purposes%", purposeText);
      let vendorsText = "";
      if (vendors) {
        for (const value of vendors) {
          vendorsText = vendorsText + '<div class="cst_reason_container"><div class="cst_reason_info"><h5 class="cst_reason_h">' + value.name + '</h5><p class="cst_reason_p"><b>Privacy Policy:</b> ' + value.policyUrl + '<p><p class="cst_reason_p"><b>Ablaufdatum:</b> ' + Math.round(value.cookieMaxAgeSeconds / (60 * 60 * 24)) + 'd<p><p class="cst_reason_p"><b>Zwecke:</b> ' + getPurposenames(value.purposes) + '<p></div><div class="cst_reason_consent_container"><label class="cst_reason_consent_switch"><input type="checkbox" class="cst_reason_consent_checkbox" value_id="' + value.id + ' vendor"><span class="cst_reason_consent_slider"></span></label></div></div>';
        }
      }
      consentText = consentText.replace("%vendors%", vendorsText);
      if (body.length >= 1) {
        insertCssClasses();
        body[0].innerHTML = consentText + body[0].innerHTML;
        addEventListeners();
      }
    }
    function insertCssClasses() {
      let cssText = `
        :root {
            --cst_banner_width: %banner_width%px;
            --cst_banner_background: %banner_background%;
            --cst_banner_overlap_color: rgb(0, 0, 0, 0.2);
            --cst_banner_border_radius: %banner_border_radius%px;
            --cst_banner_border_color: transparent;
            --cst_banner_border_width:  0px;
            --cst_banner_border_sytle:  solid;
            --cst_banner_position_left: %postion_left%;
            --cst_banner_position_top: %postion_top%;
            --cst_headline_size: %headline_size%px;
            --cst_headline_color: %headline_color%;
            --cst_headline2_size: %paragraph_size%px;
            --cst_headline2_color: %paragraph_color%;
            --cst_paragraph_size: %paragraph_size%px;
            --cst_paragraph_color: %paragraph_color%;
            --cst_accept_button_backround_color: %accept_background_color%;
            --cst_accept_button_border_color: %accept_border_color%;
            --cst_accept_button_color: %accept_color%;
            --cst_accept_button_font_size: 18px;
            --cst_accept_button_font_weight: bold;
            --cst_accept_button_width: 25%;
            --cst_accept_border_radius: %accept_border_radius%px;
            --cst_accept_border_width: %accept_border_width%px;
            --cst_reject_button_backround_color: %reject_background_color%;
            --cst_reject_button_border_color: %reject_border_color%;
            --cst_reject_button_color: %reject_color%;
            --cst_reject_button_font_size: 18px;
            --cst_reject_button_font_weight: normal;
            --cst_reject_button_width: 25%;
            --cst_reject_border_radius: %reject_border_radius%px;
            --cst_reject_border_width: %reject_border_width%px;
            --cst_settings_button_backround_color: %settings_background_color%;
            --cst_settings_button_border_color: %settings_border_color%;
            --cst_settings_button_color:  %settings_color%;
            --cst_settings_button_font_size: 18px;
            --cst_setttings_button_font_weight: normal;
            --cst_settings_button_width: 25%;
            --cst_settings_border_radius: %settings_border_radius%px;
            --cst_settings_border_width: %settings_border_width%px;
            --cst_link_color: %link_color%;
            --cst_link_font_size: %link_font_size%px;
            --cst_link_decoration: underline;
        }
        
        .cst_container{
            margin: 0;
            padding: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: var(--cst_banner_overlap_color);
            z-index: 999;
        }

        .cst_cookie_settings_container{
            
        }
        
        .cst_cookie_settings_container .cst_cookie_settings{
            position: absolute;
            width: 50px;
            height: 50px;
            max-width: 10%;
            border-radius: 100px;
            background-color: var(--cst_accept_button_backround_color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            left: 3%;
            bottom: 50px;
        }
        
        .cst_cookie_settings_container .cst_cookie_settings svg{
            height: 50%;
            color: var(--cst_accept_button_color);
        }
        
        .cst_container .cst_banner{
            background-color: var(--cst_banner_background);
            border-radius: var(--cst_banner_border_radius);
            max-height: 90%;
            overflow: scroll;
            padding: 35px;
            max-width: 90%;
            width: var(--cst_banner_width);
            position: fixed;
            left: var(--cst_banner_position_left);
            top: var(--cst_banner_position_top);
            transform: translateX(-50%) translateY(-50%);
            display: block;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .cst_banner::-webkit-scrollbar {
            display: none;
          }
        
        .cst_container .cst_banner .cst_main_container{
            display: block;
        }
        
        .cst_container .cst_banner .cst_settings_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_vendors_container{
            display: none;
        }
        
        .cst_container .cst_banner .cst_head{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_head .cst_image{
            max-width: 20%;
        }
        
        .cst_container .cst_banner .cst_head .cst_headline{
            font-weight: bold;
            font-size: var(--cst_headline_size);
            margin: 0px;
            margin-top: 10px;
            color: var(--cst_headline_color);
        }
        
        .cst_container .cst_banner .cst_body {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cst_container .cst_banner .cst_body .cst_text{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 10px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap{
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_reject{
            min-width: var(--cst_reject_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_reject_button_backround_color);
            color: var(--cst_reject_button_color);
            font-weight: normal;
            font-size: var(--cst_reject_button_font_size);
            border-radius: var(--cst_reject_border_radius);
            border-color: var(--cst_reject_button_border_color);
            border-width: var(--cst_reject_border_width);
            border-style: solid;
            cursor: pointer;
            text-decoration: none;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_settings{
            min-width: var(--cst_setting_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_settings_button_backround_color);
            color: var(--cst_settings_button_color);
            font-weight: normal;
            font-size: var(--cst_settings_button_font_size);
            border-radius: var(--cst_settings_border_radius);
            border-color: var(--cst_settings_button_border_color);
            border-width: var(--cst_settings_border_width);
            border-style: solid;
            text-decoration: none;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_accept{
            min-width: var(--cst_accept_button_width);
            padding: 10px;
            text-align: center;
            margin: 5px;
            background-color: var(--cst_accept_button_backround_color);
            color: var(--cst_accept_button_color);
            font-weight: normal;
            font-size: var(--cst_accept_button_font_size);
            border-radius: var(--cst_accept_border_radius);
            border-color: var(--cst_accept_button_border_color);
            border-width: var(--cst_accept_border_width);
            border-style: solid;
            text-decoration: none;
            cursor: pointer;
        }
        
        .cst_container .cst_banner .cst_body .cst_button_wrap .cst_link{
            text-decoration: underline;
            margin: 5px;
            font-size: 16px;
        }
        
        .cst_container .cst_banner .cst_body .cst_scroll{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 400px;
            max-height: 60%;
            overflow: scroll;
            padding-bottom: 20px;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_h{
            font-weight: bold;
            font-size: var(--cst_headline2_size);
            margin: 5px;
            color: var(--cst_headline2_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_p{
            font-weight: normal;
            font-size: var(--cst_paragraph_size);
            margin: 5px;
            color: var(--cst_paragraph_color);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table{
            margin: 5px;
            width:90%;
            padding: 10px
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td, th, tr, table{
            border-width: 1px;
            border-color: rgb(0, 0, 0, 0.5);
            border-style: solid;
            border-collapse: collapse;
            margin: 0;
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table th{
            padding: 4px;
            text-align: start;
            font-size: 16px;
            font-weight: bold;
            color: rgb(0, 0, 0);
            background-color: rgb(0, 0, 0, 0.1);
        }
        
        .cst_container .cst_banner .cst_body .cst_reason_table td{
            padding: 4px;
            text-align: start;
            font-size: 14px;
            font-weight: normal;
            color: rgb(0, 0, 0);
        }
        
        .cst_container .cst_banner .cst_body .cst_link{
            text-decoration: var(--cst_link_decoration);
            margin: 5px;
            font-size: var(--cst_link_font_size);
            color: var(--cst_link_color);
        }
        
        .cst_reason_consent_switch {
            margin: 5px;
            position: relative;
            display: inline-block;
            width: 45px;
            height: 26px;
          }
          
         .cst_reason_consent_checkbox {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .cst_reason_consent_slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider {
            background-color: #2196F3;
          }
          
          .cst_reason_consent_checkbox:focus + .cst_reason_consent_slider {
            box-shadow: 0 0 1px #2196F3;
          }
          
          .cst_reason_consent_checkbox:checked + .cst_reason_consent_slider:before {
            -webkit-transform: translateX(17px);
            -ms-transform: translateX(17px);
            transform: translateX(17px);
          }        
        `;
      let style = document.createElement("style");
      style.textContent = cssText;
      style.name = "ConsentFlowStyles";
      let head = document.head || document.getElementsByTagName("head")[0];
      head.appendChild(style);
    }
    function insertSettingIcon() {
      const consentText = document.createElement("div");
      consentText.classList.add("cst_cookie_settings_container");
      consentText.innerHTML = `
            <a class="cst_cookie_settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                </svg>
            </a>`;
      const body = document.querySelector("body");
      if (body) {
        body.insertBefore(consentText, body.firstChild);
        insertCssClasses();
        const openConsentSettings = document.querySelector(".cst_cookie_settings");
        if (openConsentSettings) {
          openConsentSettings.addEventListener("click", showBanner);
        }
      }
    }
    function hideBanner() {
      let cookiebanners = document.getElementsByClassName("cst_container");
      Array.from(cookiebanners).forEach((e) => e.remove());
      insertSettingIcon();
    }
    function getPurposenames(inputPurpose) {
      let purposeString = "";
      inputPurpose.forEach((p) => {
        for (const [key, value] of Object.entries(purposes)) {
          if (p == value.id) {
            purposeString = purposeString + value.name + "; ";
          }
        }
      });
      return purposeString;
    }
    function getAllVendorsIds() {
      let iabvendorids = vendors.filter((item) => item.iab_id !== null).map((item) => parseInt(item.iab_id));
      if (iabvendorids == null)
        iabvendorids = [];
      return iabvendorids;
    }
    function acceptAll() {
      for (const [key, value] of Object.entries(purposes)) {
        if (!purposesAllowed.includes(value.id)) {
          purposesAllowed.push(value.id);
        }
      }
      vendorsAllowed = [];
      vendors.forEach(function(v) {
        vendorsAllowed.push(v.id);
      });
      tcModel.vendorConsents.set(getAllVendorsIds());
      tcModel.purposeConsents.set(purposesAllowed);
      let newTcString = createTcString();
      tcfCmpApi.update(newTcString, false);
      setCookieValue("cf_tcf_string", newTcString);
      setCookieValue("cst_consent", { allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed });
      addScripts();
      hideBanner();
      insertSettingIcon();
      send_analytics(1);
    }
    function rejectAll() {
      purposesAllowed = [];
      vendorsAllowed = [];
      tcModel.vendorConsents.empty();
      tcModel.purposeConsents.empty();
      let newTcString = createTcString();
      tcfCmpApi.update(newTcString, false);
      setCookieValue("cf_tcf_string", newTcString);
      setCookieValue("cst_consent", { allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed });
      addScripts();
      hideBanner();
      insertSettingIcon();
      send_analytics(0);
    }
    function togglePreference(value_type, value_number) {
      if (value_type.toLowerCase() == "vendor") {
        if (!vendorsAllowed.includes(parseInt(value_number))) {
          vendorsAllowed.push(parseInt(value_number));
        }
      } else if (value_type.toLowerCase() == "purpose") {
        if (!purposesAllowed.includes(parseInt(value_number))) {
          purposesAllowed.push(parseInt(value_number));
        }
      }
    }
    function saveSettings() {
      let iabvendorids = vendors.filter((item) => item.iab_id !== null && vendorsAllowed.includes(item.iab_id)).map((item) => item.iab_id);
      tcModel.vendorConsents.set(iabvendorids);
      tcModel.purposeConsents.set(purposesAllowed);
      let newTcString = createTcString();
      tcfCmpApi.update(newTcString, false);
      setCookieValue("cf_tcf_string", newTcString);
      setCookieValue("cst_consent", { allowedPurposes: purposesAllowed, allowedVendors: vendorsAllowed });
      addScripts();
      hideBanner();
      send_analytics(3);
    }
    function consentStatus() {
      let consent_string = getCookieValue("cst_consent");
      if (!consent_string || !consent_string.createDate) {
        return false;
      }
      if (consent_string.createDate > generateDate) {
        return true;
      }
    }
    function loadPreferences() {
      let consent_string = getCookieValue("cst_consent");
      if (consent_string.allowedPurposes) {
        purposesAllowed = consent_string.allowedPurposes;
      }
      if (consent_string.allowedVendors) {
        vendorsAllowed = consent_string.allowedVendors;
        let iabs_allowed = [];
        vendorsAllowed.forEach((v) => {
          let vendor_obj = vendors.filter((ven) => ven.id != null && ven.id === v);
          if (vendor_obj != null && vendor_obj[0] != null && vendor_obj[0].iab_id)
            iabs_allowed.push(parseInt(vendor_obj[0].iab_id));
        });
        tcModel.vendorConsents.set(iabs_allowed);
        tcModel.purposeConsents.set(purposesAllowed);
        let newTcString = createTcString();
        tcfCmpApi.update(newTcString, false);
      }
    }
    function getTcString() {
      let tcfstring = getCookieValue("cf_tcf_string");
      if (tcfstring)
        return tcfstring;
      showBanner();
      return "";
    }
    function addScripts() {
      vendorsAllowed.forEach((id) => {
        const vendor_obj = vendors.find((v) => v.id == id);
        if (vendor_obj && vendor_obj.script) {
          console.log(vendor_obj.script);
          const scriptElement = document.createElement("script");
          scriptElement.textContent = vendor_obj.script;
          document.head.appendChild(scriptElement);
        }
      });
    }
    let analyticsURL = "https://consentflow.de/api/consents_api";
    function send_analytics(status) {
      fetch(analyticsURL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ consent_id: consentId, accept_value: status })
      }).then((res) => {
      });
    }
    function addEventListeners() {
      let acceptAllButtons = document.getElementsByClassName("cst_accept");
      Array.from(acceptAllButtons).forEach((e) => {
        e.addEventListener("click", () => {
          acceptAll();
        });
      });
      let rejectAllButtons = document.getElementsByClassName("cst_reject");
      Array.from(rejectAllButtons).forEach((e) => {
        e.addEventListener("click", () => {
          rejectAll();
        });
      });
      let saveSettingsAllButtons = document.getElementsByClassName("cst_save_settings");
      Array.from(saveSettingsAllButtons).forEach((e) => {
        e.addEventListener("click", () => {
          saveSettings();
        });
      });
      let settingsButton = document.getElementById("cst_settings");
      settingsButton.addEventListener("click", () => {
        let mainContainer = document.getElementsByClassName("cst_main_container");
        Array.from(mainContainer).forEach((e) => {
          e.style.display = "none";
        });
        let settingsContainer = document.getElementsByClassName("cst_settings_container");
        Array.from(settingsContainer).forEach((e) => {
          e.style.display = "block";
        });
      });
      let vendorSettingsButton = document.getElementById("cst_vendor_settings");
      vendorSettingsButton.addEventListener("click", () => {
        let settingsContainer = document.getElementsByClassName("cst_settings_container");
        Array.from(settingsContainer).forEach((e) => {
          e.style.display = "none";
        });
        let vendorContainer = document.getElementsByClassName("cst_vendors_container");
        Array.from(vendorContainer).forEach((e) => {
          e.style.display = "block";
        });
      });
      let reasonSettingsButton = document.getElementById("cst_reason_settings");
      reasonSettingsButton.addEventListener("click", () => {
        let vendorContainer = document.getElementsByClassName("cst_vendors_container");
        Array.from(vendorContainer).forEach((e) => {
          e.style.display = "none";
        });
        let settingsContainer = document.getElementsByClassName("cst_settings_container");
        Array.from(settingsContainer).forEach((e) => {
          e.style.display = "block";
        });
      });
      let openConsentSettings = document.getElementsByClassName("cst_cookie_settings");
      Array.from(openConsentSettings).forEach((e) => {
        e.addEventListener("click", () => {
          showBanner();
        });
      });
      let consentCheckBoxInput = document.getElementsByClassName("cst_reason_consent_checkbox");
      Array.from(consentCheckBoxInput).forEach((e) => {
        e.addEventListener("input", (i) => {
          let value_id = i.target.getAttribute("value_id");
          if (value_id) {
            let value_type = value_id.split(" ")[1];
            let value_number = value_id.split(" ")[0];
            togglePreference(value_type, value_number);
          }
        });
      });
    }
  };
  document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "interactive") {
    }
    if (event.target.readyState === "complete") {
      let consent = ConsentFlow();
    }
  });
})();
