import { CompositeFilterExpr, IFilterExpr } from "..";
import { GraphObjDef } from "../../cypher-types";
import { IAliasedFilter } from "./alias-filter";

export class ComposeOneFilterExpr
  extends CompositeFilterExpr
  implements IFilterExpr
{
  composedFilter?: IFilterExpr;

  setComposedFilter(filterExpr: IFilterExpr) {
    this.composedFilter = filterExpr;
    return this;
  }

  get filtersToReduce(): IFilterExpr[] {
    return this.composedFilter ? [this.composedFilter] : [];
  }
}
