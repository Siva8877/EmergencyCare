'use strict';

import { Injectable } from '@angular/core';

@Injectable() /** Class represents the Data Storage mechanism  */
export class DataStorageService {

    constructor() { }

    /*************************************************************************
   * Writes/Stores the object in sessionStorage with key
   * @function write
   * @param {string} key key for the object to store
   * @param {any} value object to be stored
   */
    public write(key: string, value: any) {
        if (value) {
            localStorage.setItem(key, value);
        } else if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    }

    /*************************************************************************
   * Read/Retrives the object from sessionStorage using key
   * @function read<T>
   * @param {string} key key for the object to store
   * @return {T} return the object of type T
   */
    public read<T>(key: string): any{
        let value: any;

        value = localStorage.getItem(key);

        if (value && value !== 'undefined' && value !== 'null') {
            const instance = <T>JSON.parse(value);
            return instance;
        }
        return null;
    }
}
