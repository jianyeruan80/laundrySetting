import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

 transform(value: any, args: any[]): any {
    if (!value) return value;

     switch (args[0]) {
     	case "=":
     		if(typeof(args[1])=="object"){
     				let key = Object.keys(args[1])[0];
             
     				return value.filter(item =>item[key]==args[1][key]);
     				
     		}else{
     			return value.filter(item =>item==args[1]);
     		}
     	case "!=":
     		if(typeof(args[1])=="object"){
     				return [];
     		}else{
     			return value.filter(item =>item !=args[1]);
     		}
     	  case "objectToArray":
     	  return Object.keys(value).map(key => value[key]);
        case "objectToStr":
        return JSON.stringify(value);
      /*  case "objectToStr":
        return JSON.stringify(value);*/
     }
 }    
}
/*
 transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }


transform(value: any, args: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.args(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }
}*/

