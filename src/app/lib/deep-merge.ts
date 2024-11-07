type Object = { [key: string]: any };

const isObject = (item: any): item is Object => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Deep merge two objects by overriding target with fields in source.
 * It returns a new object and doesn't modify any object in place since
 * it deep clones the target object first.
 */
// export const deepMerge = (target: Object, source: Object, level = 0) => {
//   const copyTarget = level === 0 ? structuredClone(target) : target;
//   for (const key in source) {
//     const sourceValue = source[key];
//     // Assign source value to copyTarget if source value is not an object.
//     // Otherwise, call deepMerge recursively to merge all its keys
//     if (!isObject(sourceValue)) {
//       copyTarget[key] = sourceValue;
//     } else {
//       if (!isObject(copyTarget[key])) {
//         copyTarget[key] = {};
//       }
//       deepMerge(copyTarget[key], sourceValue, level + 1);
//     }
//   }
//   return copyTarget;
// };

export function deepMerge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  const result = { ...obj1 } as T & U;

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      const value1 = result[key];
      const value2 = obj2[key];

      if (isObject(value1) && isObject(value2)) {
        result[key] = deepMerge(value1, value2);
      } else {
        result[key] = value2 as any;
      }
    }
  }

  return result;
}
