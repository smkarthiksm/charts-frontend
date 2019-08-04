import { Component, OnInit } from '@angular/core';

import DailyInventoryService from '../services/daily-inventory.service';
import DailyInventoryChart from '../models/DailyInventoryChart';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'charts-frontend';
  dailyInventoryChartModel: Array<DailyInventoryChart>;
  mode = 'day';
  chartData: any;
  hoverContent: string;

  /**
   *
   */
  constructor(public dailyInventoryService: DailyInventoryService) {
  }

  ngOnInit() {
    this.getDailyInventoryDay(6);
  }

  getDailyInventoryDay(month: number) {
    this.dailyInventoryService.getDailyInventoryByDay(month).subscribe((data) => {
      this.dailyInventoryChartModel = data;
      console.log(data);
    });
  }

  getDailyInventoryWeek(month: number) {
    this.dailyInventoryService.getDailyInventoryByWeek(month).subscribe((data) => {
      this.dailyInventoryChartModel = data;
      console.log(data);
    });
  }

  modeChange(mode: string) {
    console.log(this.hoverContent);

    this.mode = mode;
    this.dailyInventoryChartModel = null;
    if (mode === 'day') {
      this.getDailyInventoryDay(6);
    } else {
      this.getDailyInventoryWeek(6);
    }
  }
}
