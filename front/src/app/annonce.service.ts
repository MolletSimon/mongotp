import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Annonce } from './annonce';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class AnnonceService {
    private baseUrl = 'http://localhost:3000/api';
    private modifyUrl = 'modify/:id';
    private deleteUrl = 'delete/:id';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getAnnonce(id: string): Observable<Annonce> {
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

    getAnnoncesByDate(date: string): Observable<Annonce[]> {
        const url = `${this.baseUrl}/bydate/${date}`;
        return this.http.get<Annonce[]>(url).pipe(catchError(this.handleError<any>('getAnnoncesByDate', [])));
    }

    updateAnnonce(annonce: Annonce): Observable<any> {
        const url = `${this.baseUrl}/modify/${annonce._id}`;
        return this.http.put<any>(url, {"name": annonce.name, "beds": annonce.beds, "bathrooms_text": annonce.bathrooms_text, "price": annonce.price, "host_name": annonce.host_name}).pipe(catchError(this.handleError<any>('updateAnnonce')));
    }

    deleteAnnonce(id: string): Observable<any> {
        const url = `${this.baseUrl}/delete/${id}`;
        return this.http.delete<any>(url).pipe(catchError(this.handleError<any>('deleteAnnonce')));
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
            console.error(`${operation} : ${error}`); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}