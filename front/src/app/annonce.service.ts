import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Annonce } from './annonce';
import { Annonces } from './mock-annonces';
import { formatDate } from '@angular/common';

export class AnnonceService {
    private baseUrl = 'localhost:3000/api';
    private modifyUrl = 'modify/:id';
    private deleteUrl = 'delete/:id';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getAnnonce(id: number): Observable<Annonce> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Annonce>(url).pipe(catchError(this.handleError<any>('getAnnonce', {})));
    }

    getAnnoncesPage(page: number, sort: string = 'asc'): Observable<Annonce[]> {
        if(sort != 'asc' && sort != 'desc') {
            sort = 'asc';
        }
        const url = `${this.baseUrl}/getpaginate/${page}/${sort}`;
        return this.http.get<Annonce[]>(url).pipe(catchError(this.handleError<any>('getAnnoncesPage', [])));
    }

    getAnnoncesByDate(date: Date): Observable<Annonce[]> {
        const url = `${this.baseUrl}/bydate/${formatDate(date, 'yyyy-MM-dd', 'fr-FR')}`;
        return this.http.get<Annonce[]>(url).pipe(catchError(this.handleError<any>('getAnnoncesByDate', [])));
    }

    updateAnnonce(annonce: Annonce): void {

    }

    deleteAnnonce(id: number): void {

    }
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}