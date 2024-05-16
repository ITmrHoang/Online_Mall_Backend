import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./constants.js";

const ENUMS_DB = {
  POSTGRES: "postgres",
};

let instance = null; // Biến lưu trữ instance duy nhất của DB

class DB {
  _type = null;
  _db = null;

  /**
   * Creates an instance of DB.
   *
   * @constructor
   * @param {*} type type data base
   */
  constructor(type) {
    if (!instance) {
      // Nếu instance chưa được khởi tạo, thực hiện khởi tạo
      instance = this;
      this._type = type;
      this.set_db(type);
    }
    return instance; // Trả về instance duy nhất
  }

  /**
   * @param {any} type
   */
  set _type(type) {
    throw new Error("cannot set type");
  }

  get type() {
    return this._type;
  }

  get db() {
    return this._db;
  }

  set_db(type) {
    if (type instanceof InterfaceDB) {
      this._db = type;
    } else if (
      type instanceof String ||
      Object.prototype.toString.call(type) === "[object String]"
    ) {
      switch (type.toLowerCase()) {
        case ENUMS_DB.POSTGRES:
          this._db = new DB_POSTGRES();
          break;
        default:
          throw new Error("Type database is not supported");
          break;
      }
    }
  }
}

class InterfaceDB {
  _db = null;
  get() {
    throw new Error("Method not define for type.");
  }

  get_db() {
    return this._db;
  }

  /**
   * @param {null} db set connect db instance
   */
  set db(db) {
    this._db = db;
  }
}

class DB_POSTGRES extends InterfaceDB {
  constructor() {
    super();
    // Import module chỉ khi cần sử dụng
    import("pg-promise")
      .then((module) => {
        const Postgres = module.default;
        const pgp = new Postgres();
        const db = pgp(
          `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        );
        this.db = db;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //   async doSomething() {
  //     // Import module chỉ khi cần sử dụng
  //     const module = await import('./AnotherExternalClass');
  //     const AnotherExternalClass = module.default;
  //     const anotherExternalInstance = new AnotherExternalClass();
  //     anotherExternalInstance.method();
  //   }
}

export { DB };

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BaseRepository {
  constructor(model = null) {
    if (
      model &&
      (model instanceof String ||
        Object.prototype.toString.call(model) === "[object String]")
    ) {
      this.model = model;
    } else {
      this.model = this.getClassName();
    }
  }

  getModel() {
    return prisma[this.model];
  }
  getClassName() {
    return this.constructor.name;
  }

  async create(data) {
    return await prisma[this.model].create({
      data,
    });
  }

  async findUnique(where) {
    return await prisma[this.model].findUnique({
      where,
    });
  }

  async findById(id) {
    return await prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(where) {
    return await prisma[this.model].findMany({
      where,
    });
  }

  async update(where, data) {
    return await prisma[this.model].update({
      where,
      data,
    });
  }

  async delete(where) {
    return await prisma[this.model].delete({
      where,
    });
  }
}

export class BaseService {
  _repository = null;
  constructor(repository) {
    if (repository) {
      this._repository = repository;
    } else {
      this._repository = this.getRepository();
    }
  }

  /**
   * @param {any} val
   */
  set _repository(val) {
    throw new Error("Method not define for type.");
  }
  setRepository() {
    this._repository = this.getRepository();
  }

  getRepository() {
    // code get and for set repository
  }

  create(data) {
    return this._repository.create(data);
  }
  findUnique(where) {
    return this._repository.findUnique(where);
  }
  getById(id) {
    return this._repository.findById(id);
  }

  update(where, data) {
    return this._repository.update(where, data);
  }

  delete(where) {
    return this._repository.delete(where);
  }

  getAll() {
    return this._repository.findMany();
  }
}
