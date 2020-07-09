import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:photo_view/photo_view.dart';

class ZoomableImage extends StatelessWidget{

  final String image;

  ZoomableImage({this.image});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          child: PhotoView(imageProvider: CachedNetworkImageProvider(image))),
    );
  }
}