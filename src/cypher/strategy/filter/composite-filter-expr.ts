import { IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export class CompositeFilterExpr implements IFilterExpr {
  filter: IStrategyFilter;
  results: IFilterResult = {};
  composedFilters: IFilterExpr[] = [];

  constructor(filter: IStrategyFilter) {
    this.filter = filter;
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  addFilter(filterExpr: IFilterExpr) {
    this.composedFilters.push(filterExpr);
    return this;
  }

  run(): GraphObjDef[] {
    return [];
  }
}
