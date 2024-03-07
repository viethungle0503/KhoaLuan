import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}

  userRole: string = '';
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this._toastr.info('Please login to view this page', 'Info', {
        timeOut: 3000,
      });
      this._router.navigate(['/login']);
      return;
    }
    this._authService.getProtected().subscribe({
      next: (res) => {
        if (res.result) {
          this.userRole = res.user.role;
          return;
        }
        this._toastr.info('Please login to view this page', 'Info', {
          timeOut: 3000,
        });
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this._toastr.error(
          'You are not authorized to view this page',
          'Error',
          {
            timeOut: 3000,
          }
        );
        this._router.navigate(['/login']);
        console.log(err);
      },
    });
  }
}
