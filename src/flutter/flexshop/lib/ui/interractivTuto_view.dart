// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'package:flexshop/model/slide.dart';
import 'package:flexshop/api/slide_api.dart';
import 'package:flexshop/widget/zoomable_image_widget.dart';


class InterractivTuto extends StatelessWidget {
  final int machine;
  final String machineName;

  InterractivTuto({Key key, @required this.machine, this.machineName})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InterractiTutoStateful(
      machine: this.machine,
      machineName: this.machineName,
    );
  }
}

class InterractiTutoStateful extends StatefulWidget {
  final int machine;
  final String machineName;

  InterractiTutoStateful({Key key, @required this.machine, this.machineName})
      : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return InterractiTutoState();
  }
}

class InterractiTutoState extends State<InterractiTutoStateful> with SingleTickerProviderStateMixin {

  String machineName; //useless
  int machineId;
  Slide slide; //to delete
  List<Slide> slideList;
  TabController _tabController;

  @override
  void initState() {
    super.initState();
    this.machineId = widget.machine;
    this.machineName = widget.machineName;
    _getDataFromAPI();
  }

  Future<void> _getDataFromAPI() async {
    await SlideAPI.getSlidesByMachineId(
        id: this.machineId,
        onDone: (int status, dynamic data) {
          List<Slide> slideL = List<Slide>();
          for (final elem in data) {
            slideL.add(Slide.fromMapObject(elem));
          }
          setState(() {
            this.slideList = slideL;
            _tabController = TabController(vsync: this, length: this.slideList.length);
          });
        });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _nextPage(int delta) {
    final int newIndex = _tabController.index + delta;
    if (newIndex < 0 || newIndex >= _tabController.length) return;
    _tabController.animateTo(newIndex);
  }

  @override
  Widget build(BuildContext context) {
    if (this.slideList == null) {
      return Center(child: CircularProgressIndicator());
    } else {
      return buildBody(context);
    }
  }

  @override
  Widget buildBody(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Color.fromRGBO(147, 49, 97, 1.0),
          title: Center(child: Text(this.machineName)),
          leading: IconButton(
            tooltip: 'Previous choice',
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              _nextPage(-1);
            },
          ),
          actions: <Widget>[
            IconButton(
              icon: const Icon(Icons.arrow_forward),
              tooltip: 'Next choice',
              onPressed: () {
                _nextPage(1);
              },
            ),
          ],
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(48.0),
            child: Theme(
              data: Theme.of(context).copyWith(accentColor: Colors.white),
              child: Container(
                height: 48.0,
                alignment: Alignment.center,
                child: TabPageSelector(controller: _tabController),
              ),
            ),
          ),
        ),
        body: TabBarView(
          controller: _tabController,
          children: this.slideList.map((Slide slide) {
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: SlideCard(slide: slide, ctx: context),
            );
          }).toList(),
        ),
      ),
    );
  }
}


class SlideCard extends StatelessWidget {
  const SlideCard({Key key, this.slide, this.ctx}) : super(key: key);

  final Slide slide;
  final BuildContext ctx;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          Text(
            this.slide.title,
            style: GoogleFonts.pacifico(
                textStyle: TextStyle(
                    color: Color.fromRGBO(147, 49, 97, 1.0),
                    fontSize: 30)),
          ),
          isNetworkImageAvailable(
              context: ctx,
              image: this.slide.image,
              placeholder:
              "assets/images/placeholders/workshops.jpg"),
          SizedBox(height: 20.0,),
          Text(
            this.slide.description,
            style: TextStyle(fontSize: 20),
          ),
        ],
      ),
    );
  }

  Widget isNetworkImageAvailable({BuildContext context, String image, String placeholder}) {
    if (!image.startsWith("/uploads"))
      return Image.asset(placeholder,
          fit: BoxFit.fitWidth,
          color: Color.fromRGBO(0, 0, 0, 0.5),
          colorBlendMode: BlendMode.darken);
    else
      image = 'http://ftp.simple-duino.com:58/' + image;
      return GestureDetector(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => ZoomableImage(image: image,)));
        },
        child: Image.network(image,
            fit: BoxFit.fitWidth,),
      );
  }
}

