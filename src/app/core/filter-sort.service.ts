import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class FilterSortService {

  constructor(private datePipe: DatePipe) { }

  private _objArrayCheck(array: any[]): boolean {
    // Checks if the first item in the array is an object
    // (assumes same-shape for all array items)
    // Necessary because some arrays passed in may have
    // models that don't match {[key: string]: any}[]
    // This check prevents uncaught reference errors
    const item0 = array[0];
    const check = !!(array.length && item0 !== null && Object.prototype.toString.call(item0) === '[object Object]');
    return check;
  }

  filter(array: any[], property: string, value: any) {
    // Return only items with specific key/value pair
    if (!property || value === undefined || !this._objArrayCheck(array)) {
      return array;
    }
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === property && item[key] === value) {
            return true;
          }
        }
      }
    });
    return filteredArray;
  }

  search(array: any[], query: string, excludeProps?: string|string[], dateFormat?: string) {
    // Match query to strings and Date objects / ISO UTC strings
    // Optionally exclude properties from being searched
    // If matching dates, can optionally pass in date format string
    if (!query || !this._objArrayCheck(array)) {
      return array;
    }
    const lQuery = query.toLowerCase();
    const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
    const dateF = dateFormat ? dateFormat : 'medium';
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (!excludeProps || excludeProps.indexOf(key) === -1) {
            const thisVal = item[key];
            if (
              // Value is a string and NOT a UTC date
              typeof thisVal === 'string' &&
              !thisVal.match(isoDateRegex) &&
              thisVal.toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            } else if (
              // Value is a Date object or UTC string
              (thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
              // https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html
              // Matching date format string passed in as param (or default to 'medium')
              this.datePipe.transform(thisVal, dateF).toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            }
          }
        }
      }
    });
    return filteredArray;
  }

  noSearchResults(arr: any[], query: string): boolean {
    // Check if array searched by query returned any results
    return !!(!arr.length && query);
  }

  orderByDate(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a date property
    // Default: ascending (1992->2017 | Jan->Dec)
    if (!prop || !this._objArrayCheck(array)) {
      return array;
    }
    const sortedArray = array.sort((a, b) => {
      const dateA = new Date(a[prop]).getTime();
      const dateB = new Date(b[prop]).getTime();
      return !reverse ? dateA - dateB : dateB - dateA;
    });
    return sortedArray;
  }

}
