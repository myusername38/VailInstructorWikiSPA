import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/interfaces/area';
import { BackgroundService } from 'src/app/services/background.service';
import { DataService } from 'src/app/services/data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  loading: boolean = false;
  areas: Area[] = [];
  background: string = '';

  constructor(
    private snackbarService: SnackbarService,
    private dataService: DataService,
    private backgroundService: BackgroundService,
  ) {}

  ngOnInit(): void {
    this.loadAreas();
    this.generateImage();
  }

  async loadAreas() {
    try {
      this.loading = true;
      this.areas = await this.dataService.getAreas();
    } catch (err) {
      console.log(err);
      this.snackbarService.showError('Error loading errors');
    } finally {
      this.loading = false;
    }
  }

  generateImage() {
    const imageName = this.backgroundService.getRandomBackground();
    this.background = `url(../../../assets/pictures/${ imageName })`;
  }

  selectArea(area) {

  }
}
