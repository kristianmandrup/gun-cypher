import { CompositeFilterResult, IFilterExpr, IStrategyFilter } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { ComposeOneFilterExpr } from "../compose-one-filter-expr";

export const createNotFilterExpr = (filter: IAliasedFilter, config?: any) =>
  new NotFilterExpr(filter).config(config);

export class NotCompositeFilterResult extends CompositeFilterResult {
  composedResult(): GraphObjDef[] {
    return this.combinedResults;
  }
}

export class NotFilterExpr extends ComposeOneFilterExpr {
  createCompositeResult() {
    return new NotCompositeFilterResult();
  }

  inverse(results: any[]): GraphObjDef[] {
    return this.setOps.difference(results, this.matchedResults);
  }

  run(obj: any): GraphObjDef | undefined {
    return this.runAll([obj])[0];
  }

  runAll(objs: any): GraphObjDef[] {
    const { composedFilters } = this;
    if (!composedFilters || composedFilters.length === 0) {
      this.error("Missing composed filters");
      return [];
    }
    const results = this.runComposed(objs);
    return this.inverse(results);
  }
}
