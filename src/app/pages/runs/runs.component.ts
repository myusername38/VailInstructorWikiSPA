import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Run } from 'src/app/interfaces/run';
import { BackgroundService } from 'src/app/services/background.service';
import { DataService } from 'src/app/services/data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  loading: boolean = false;
  areaId: string = '';
  runs: Run[] = [];
  background: string = '';

  constructor(
    private snackbarService: SnackbarService,
    private dataService: DataService,
    private backgroundService: BackgroundService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.generateImage();
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.loadRuns();
  }

  async loadRuns () {
    try {
      this.loading = true;
      this.runs = await this.dataService.getRuns(this.areaId);
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

  selectRun(run: Run) {

  }
}
