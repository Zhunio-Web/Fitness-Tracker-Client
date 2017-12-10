import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

export class Logger {

  constructor() {}

  logErrorMessage( error: HttpErrorResponse, sb: MatSnackBar ) {
    let message = '';
    if ( error.status === 0 ) {
      message = 'Server is down. Try again in a few minutes.';
    } else {
      message = error.error.message;
    }

    console.log( message );
    sb.open( message, 'close', { duration: 5000 } );
  }
}
