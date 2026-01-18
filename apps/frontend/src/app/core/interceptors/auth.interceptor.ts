import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { switchMap, take, flatMap } from 'rxjs/operators';
import { from, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);

    return user(auth).pipe(
        take(1),
        switchMap(u => {
            if (u) {
                return from(u.getIdToken()).pipe(
                    switchMap(token => {
                        const authReq = req.clone({
                            setHeaders: { Authorization: `Bearer ${token}` }
                        });
                        return next(authReq);
                    })
                );
            }
            return next(req);
        })
    );
};
