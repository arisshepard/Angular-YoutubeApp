import { Component, OnInit } from '@angular/core';
import { YoutubeResponse } from 'src/app/models/youtube.models';
import { YoutubeService } from '../../services/youtube.service';
import { Item, Video } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    // this.youtubeService.getVideos().subscribe((respuesta: Video[]) => {
    //   // console.log('La respuesta: ', respuesta);
    //   // console.log('La respuesta 1 titulo: ', respuesta.items[1].snippet.title);
    //   // console.log('La respuesta: ', respuesta);
    //   this.videos.push(...respuesta);
    // });

    this.cargarVideos();
  }

  cargarVideos(): void {
    this.youtubeService.getVideos().subscribe((respuesta: Video[]) => {
      this.videos.push(...respuesta);
      console.log('Videos:', this.videos);
    });
  }

  mostrarVideo(video: Video): void {
    // console.log(video);

    Swal.fire({
      html: `<h4>${video.title}</h4><hr><iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.resourceId.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    });
  }
}
