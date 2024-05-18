"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Provider: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Account: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User", many: true }),
      provider: (0, import_fields.relationship)({ ref: "Provider", many: true }),
      token: (0, import_fields.text)(),
      refresh_token: (0, import_fields.text)(),
      expiry: (0, import_fields.timestamp)(),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Email: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      user: (0, import_fields.relationship)({ ref: "User" }),
      provider: (0, import_fields.relationship)({ ref: "Provider" }),
      subject: (0, import_fields.text)(),
      sender: (0, import_fields.text)(),
      message: (0, import_fields.text)(),
      timestamp: (0, import_fields.timestamp)(),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "id name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config({ path: ".env" });
var DB_URL = process.env[`${process.env.KEYSTONE_ENV}_DB_URL`];
var DB_PORT = process.env[`${process.env.KEYSTONE_ENV}_DB_PORT`];
var DB_USER = process.env[`${process.env.KEYSTONE_ENV}_DB_USER`];
var DB_PASSWORD = process.env[`${process.env.KEYSTONE_ENV}_DB_PASSWORD`];
if (DB_PASSWORD === void 0) {
  throw new Error(`Environment variable DB_PASSWORD is not defined.`);
}
var DB_PASSWORD_ENCODED = encodeURIComponent(DB_PASSWORD);
var DB_DATABASE = process.env[`${process.env.KEYSTONE_ENV}_DB_DATABASE`];
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: `postgresql://${DB_USER}:${DB_PASSWORD_ENCODED}@${DB_URL}:${DB_PORT}/${DB_DATABASE}`,
      idField: { kind: "autoincrement" }
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
