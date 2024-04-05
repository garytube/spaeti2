/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const admin = new Admin();
    admin.email = 'test@example.com';
    admin.setPassword('1234567890');
    dao.saveAdmin(admin);
    // Initial Drinks Collection
    const drinksCollection = new Collection({
      id: 'tcvqcirhf3tjrar',
      created: '2024-03-17 17:12:43.767Z',
      updated: '2024-03-17 17:12:43.767Z',
      name: 'drinks',
      type: 'base',
      system: false,
      schema: [
        {
          system: false,
          id: 't7bpblyd',
          name: 'name',
          type: 'text',
          required: true,
          presentable: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
        {
          system: false,
          id: 'vg8vvtbc',
          name: 'price',
          type: 'number',
          required: false,
          presentable: true,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: false,
          },
        },
        {
          system: false,
          id: 'or8dwuo6',
          name: 'amount',
          type: 'number',
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: true,
          },
        },
        {
          system: false,
          id: '5ahjmvpd',
          name: 'barcode',
          type: 'number',
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: true,
          },
        },
        {
          system: false,
          id: 'qgeghlkt',
          name: 'active',
          type: 'bool',
          required: false,
          presentable: true,
          unique: false,
          options: {},
        },
      ],
      indexes: ['CREATE INDEX `idx_q02O4If` ON `drinks` (\n  `barcode`,\n  `name`\n)'],
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: null,
      deleteRule: null,
      options: {},
    });
    dao.saveCollection(drinksCollection);
  },
  (db) => {
    const dao = new Dao(db);

    try {
      const admin = dao.findAdminByEmail('test@example.com');
      dao.deleteAdmin(admin);
    } catch (_) {
      /* most likely already deleted */
    }
  },
);
