import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Provider: list({
    access: allowAll,
    fields: {
      name: text(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    }
  }),

  Account: list({
    access: allowAll,
    fields: {
      user: relationship({ ref: 'User', many: true }),
      provider: relationship({ ref: 'Provider', many: true }),
      token: text(),
      refresh_token: text(),
      expiry: timestamp(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      })
    }
  }),

  Email: list({
    access: allowAll,
    fields: {
      user: relationship({ ref: 'User' }),
      provider: relationship({ ref: 'Provider' }),
      subject: text(),
      sender: text(),
      message: text(),
      timestamp: timestamp(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      })
    }
  })
};
