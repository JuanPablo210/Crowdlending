import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy
} from '@angular/core';
import {CAPTURADATOS, PRESTAREFECTIVO, ROUTES} from './sidebar-items';
import {AuthGuard} from "../../core/guard/auth.guard";
import {GlobalService} from "../../core/service/global.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: string;
  avatar: string;
  role: string;
  public sidebarItems: any[];
  showMenu = 'dashboard';
  level1Menu = '';
  level2Menu = '';
  level3Menu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  routerObj = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private auth: AuthGuard,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // logic for select active menu in dropdown
        const currenturl = event.url.split('?')[0];
        this.level1Menu = currenturl.split('/')[1];
        this.level2Menu = currenturl.split('/')[2];

        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = '0';
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = '0';
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = '0';
    } else {
      this.level3Menu = element;
    }
  }
  // ngOnInit() {
  //   if (this.auth.checkUserLogin()) {
  //     this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
  //   }
  //
  //   this.initLeftSidebar();
  //   this.bodyTag = this.document.body;
  //   this.user = this.globalService.getName();
  //   this.avatar = this.globalService.getAvatar();
  //   this.puesto = this.globalService.getPuesto();
  // }Administrador de Sistemas
  ngOnInit() {
    this.role = this.globalService.getRole();
    if (this.role == 'admin') {
      this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    } else if(this.role == 'Afiliado'){
      this.sidebarItems =  CAPTURADATOS.filter((sidebarItem) => sidebarItem);
    } else if (this.role == 'Mesa de Control'){
      this.sidebarItems = PRESTAREFECTIVO.filter((sidebarItem) => sidebarItem);
    }
    // this.sidebarItems = this.globalService.getMenu();
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
    this.user = this.globalService.getName();
    this.avatar = this.globalService.getAvatar();
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
