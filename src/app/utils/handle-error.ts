import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  console.log('que manda el back', error);
  const clientSide = 0;
  if (error.status === clientSide) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    if (error.status === 401) {
      console.log('no tienes permiso para ver eso');
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error,
    );
  }

  return throwError(() => error.error.title);
}
