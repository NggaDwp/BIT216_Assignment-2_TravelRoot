import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-view-analytics-report',
  templateUrl: './view-analytics-report.component.html',
  styleUrls: ['./view-analytics-report.component.css']
})
export class ViewAnalyticsReportComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  analyticsOptions = ['Monthly', 'Yearly'];
  years: number[] = [2021, 2022, 2023]; // Years list for the dropdown
  selectedYear: number = new Date().getFullYear(); // Variable to hold the selected year
  chart: Chart | undefined;
  monthlySalesData: number[][] = [
    [1000, 1200, 800, 1500, 2000, 1800, 2200, 2500, 1600, 1800, 2100, 800], // 2021
    [1250, 1300, 900, 1450, 2300, 1950, 2150, 2600, 1650, 1750, 2150, 1600], // 2022
    [1200, 1500, 100, 1650, 2100, 1850, 2300, 2700, 1700, 1900, 2200, 2600]  // 2023
  ];

  ngAfterViewInit() {
    this.displayGraph(this.analyticsOptions[0], null); // Display graph for the first sales report option by default
  }

  displayGraph(option: string, selectedYear: number | null) {
    let data: any;
    if (option === 'Monthly') {
      data = this.generateMonthlySalesData(selectedYear || this.selectedYear);
    } else if (option === 'Yearly') {
      data = this.generateYearlySalesData();
    }

    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart if it exists
    }

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // Add more options as needed
        },
      });
    } else {
      console.error('Canvas context unavailable.');
    }
  }

  generateMonthlySalesData(year: number): any {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlySalesData = this.monthlySalesData[year - this.years[0]]; // Select the monthly data for the chosen year

    const monthlyData = {
      labels: labels,
      datasets: [
        {
          label: `Monthly Sales Data for ${year}`,
          data: monthlySalesData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 3,
          aspectRatio: 5
        },
      ],
    };
    return monthlyData;
  }

  generateYearlySalesData(): any {
    const yearlyLabels = this.years.map(year => `${year}`);
    const yearlySalesData = this.years.map((year) => {
      const monthlySales = this.monthlySalesData[year - this.years[0]]; // Get the monthly sales for the current year
      const yearlyTotal = monthlySales.reduce((acc, curr) => acc + curr, 0); // Calculate the yearly total
      return yearlyTotal;
    });

    const yearlyData = {
      labels: yearlyLabels,
      datasets: [
        {
          label: 'Yearly Sales Data',
          data: yearlySalesData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3,
          aspectRatio: 5
        },
      ],
    };
    return yearlyData;
  }
  

  toggleEmailSuccessMessage() {
    const emailSuccessMessage = document.getElementById('emailSuccessMessage');
    if (emailSuccessMessage) {
      emailSuccessMessage.style.display = 'block';
    }
  }

  recipientEmail: string = ''; // To store the recipient's email


  openEmailModal() {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
      emailModal.classList.add('show');
      emailModal.style.display = 'block';
    }
  }

  closeEmailModal() {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
      emailModal.classList.remove('show');
      emailModal.style.display = 'none';
    }
    // Reset recipient's email on modal close
    this.recipientEmail = '';
  }

  sendEmail() {
    // Perform email sending logic here using this.recipientEmail
    // You can simulate the sending process for demonstration purposes
    console.log(`Sending email to ${this.recipientEmail}`);
    // After sending, close the modal and show a success message or perform further actions
    this.closeEmailModal();
    alert('Email sent successfully!');
  }


  //download function
  downloadSampleFile() {
    // Create a sample data file (e.g., CSV, JSON, etc.)
    const sampleData = 'Sample Data\n1,2,3\n4,5,6\n7,8,9';

    // Create a blob from the sample data
    const blob = new Blob([sampleData], { type: 'text/plain' });

    // Create a download link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    // Set the filename for the download
    link.download = 'Analytics_Report.txt';

    // Append the link to the body and click it to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up - remove the link after the download
    document.body.removeChild(link);
  }
}


