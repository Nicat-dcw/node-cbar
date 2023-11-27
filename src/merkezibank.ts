import { parseString } from "xml2js";
import { Agent } from "https";
import util from "node:util";
import fs from "node:fs";
import axios from "axios";
import { CurrencyTypes } from "./merkezibank.d.ts";
interface Options {
  logErrors?: boolean;
  baseURL?: string;
}
class CBAR extends Error {
  private agent: Agent;
  private resolver: any;
  private logErrors: boolean;

  constructor(opts?: { baseURL?: string; date?: string }) {
    super(opts);
    const { baseURL, date } = opts || {};
    this.agent = new Agent({ rejectUnauthorized: false });
    this.resolver = util.promisify(parseString);
    this.dataMap = new Map();
    this.date = date;
    this.baseURL = baseURL;
  }

  async convert(opts: { amount: number; currencyType?: string }) {
    const { currencyType, amount } = opts;
    if (!opts || !currencyType) throw new Error("`currencyType` is required");

    try {
      const { data } = await axios.get(
        this.baseURL ??
          `https://www.cbar.az/currencies/${this.date ?? "15.11.2023"}.xml`,
        {
          "X-Content-Type-Options": "nosniff",
          Host: "Node-Cbar",
          "X-XSS-Protection": "1; mode=block",
          mode: "cors",
        },
      );
      const parsedData = await this.resolver(data);
      const d = this.getRates(parsedData.ValCurs.ValType[1].Valute);

      const cData = this.dataMap.get(currencyType.toUpperCase());
      if (amount) {
        const obj = {
          ...cData,
          convertedValue: amount * cData.value,
        };
        return obj;
      }
      return cData;
    } catch (error) {
      throw error;
    }
  }

  getRates(data: any): any {
    const dataMap = this.dataMap;
    for (let i = 0; i < data.length; i++) {
      const typeValues = [];

      for (let j = 0; j < data[i].length; j++) {
        const currency = data[i][j];
        const valueObj = {
          code: currency.$.Code,
          nominal: currency.$.Nominal[0],
          name: currency.Name[0],
          value: currency.Value[0],
        };

        typeValues.push(valueObj);
      }
      const obj = {
        code: data[i].$.Code,
        nominal: data[i].Nominal[0],
        name: data[i].Name[0],
        value: data[i].Value[0],
      };
      dataMap.set(data[i].$.Code, obj);

      return typeValues;
    }
    console.log(dataMap);
    return dataMap;
  }
}
export { CBAR, CurrencyTypes };
