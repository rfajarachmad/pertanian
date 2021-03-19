import { Route } from '@angular/compiler/src/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
    providers: [AuthService],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        public authService: AuthService,
        public router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: '',
        });
    }
    ngOnInit() {}

    submitForm(): void {
        swal.fire({
            text: 'Signin..',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        this.authService.login(this.loginForm.value).subscribe(
            isAuthenticated => {
                swal.close();
                if (isAuthenticated) {
                    this.router.navigate(['submissions']);
                }
            },
            err => {
                swal.close();
                swal.fire({
                    icon: 'error',
                    text: 'Username/password salah!',
                });
            }
        );
    }
}
