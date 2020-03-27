import 'package:flutter/material.dart';

class Workshop {

  double id;
  String title;
  String image;

  Workshop({this.id, this.title, this.image});

}

final workshops = [
  Workshop(
    id: 0,
    title: "usinage",
    image: "images/ateliers.jpg"
  ),

  Workshop(
    id: 0,
    title: "forge",
    image: "images/ateliers.jpg"
  ),

  Workshop(
    id: 0,
    title: "fonderie",
    image: "images/ateliers.jpg"
  )
];