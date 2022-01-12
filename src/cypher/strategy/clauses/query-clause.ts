import { IFilterExpr } from "..";
import { ClauseType, WhereFilterType } from "../enum";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
}

export class QueryClause implements IQueryClause {
  expressions: IFilterExpr[] = [];

  addExpression(...expressions: IFilterExpr[]) {
    this.expressions.push(...expressions);
    return this;
  }

  subtype: WhereFilterType = WhereFilterType.none;

  error(msg: string) {
    throw new Error(msg);
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
