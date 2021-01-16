import 'package:flexshop/api/section_api.dart';
import 'package:flexshop/model/machine.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_multi_carousel/carousel.dart';
import 'package:flexshop/model/section.dart';
import 'package:flexshop/ui/interractivTuto_view.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:photo_view/photo_view.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flexshop/widget/zoomable_image_widget.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class MachineView extends StatefulWidget {
  Machine machine;

  MachineView({this.machine});

  @override
  _MachineViewState createState() => _MachineViewState(machine: this.machine);
}

class _MachineViewState extends State<MachineView> {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  final double _leftAndRightPadding = 16.0;
  final double _bottomPadding = 12.0;
  final double _topPadding = 6.0;
  List<Section> _sections = [];
  Machine machine;

  _MachineViewState({this.machine});

  @override
  void initState() {
    super.initState();
    this._sections = List();
    SectionAPI.getSectionForMachineId(
        id: widget.machine.id,
        onDone: (data) {
          List<Section> currentSections = [];
          for (var section in data) {
            currentSections.add(Section.fromMapObject(section));
          }
          setState(() {
            this._sections = currentSections;
          });
        });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: CustomScrollView(
          slivers: <Widget>[
            SliverAppBar(
              leading: IconButton(
                  icon: Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.pop(context);
                    // Do something
                  }),
              expandedHeight: 220.0,
              floating: true,
              pinned: true,
              snap: true,
              elevation: 50,
              backgroundColor: Color.fromRGBO(147, 49, 97, 1.0),
              flexibleSpace: FlexibleSpaceBar(
                centerTitle: true,
                title: SafeArea(
                  child: Text(this.machine.title,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 40,
                      )),
                ),
                background: getSliverBackground(),
              ),
            ),
            new SliverList(
                delegate: new SliverChildListDelegate(_buildList(context))),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildList(BuildContext context) {
    List<Widget> widgetList = List<Widget>();
    if (this._sections.length < 1)
      return [
        Center(
          child: Container(
            width: 50,
            height: 50,
            child: FittedBox(
                fit: BoxFit.contain, child: CircularProgressIndicator()),
          ),
        )
      ];
    else {
      for (int i = 0; i < _sections.length; i++) {
        switch (_sections[i].type.toLowerCase()) {
          case "pictograms":
            {
              widgetList.add(_buildPictos(_sections[i]));
            }
            break;

          case "description":
            {
              widgetList.add(_buildDescriptionTile(_sections[i]));
            }
            break;

          case "carouseltutovideo":
            {
              widgetList.add(_buildTutoVideo(_sections[i]));
            }
            break;

          case "imagewithtitle":
            {
              widgetList.add(_buildImageWithTitle(_sections[i]));
            }
            break;

          case "interactivtuto":
            {
              widgetList.add(_buildInterractivTuto(context, _sections[i]));
            }
            break;

          default:
            {
              print("This type of section is an invalid value: ");
              print(_sections[i].type);
            }
            break;
        }
      }
      return widgetList;
    }
  }

  Widget _buildPictos(Section section) {
    return section.pictosLinkList == null
        ? CircularProgressIndicator()
        : Container(
            padding: EdgeInsets.only(
                left: _leftAndRightPadding,
                right: _leftAndRightPadding,
                top: _topPadding),
            height: 50 + _topPadding,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                shrinkWrap: true,
                itemCount: section.pictosLinkList.length,
                itemBuilder: (BuildContext context, int i) {
                  return Container(
                      height: 50,
                      width: 50,
                      child: Image.asset("assets/images/pictograms/" +
                          section.pictosLinkList[i]));
                }),
          );
  }

  Widget _buildDescriptionTile(Section section) {
    return ExpansionTile(
      title: Text(
        section.title == null ? "" : section.title,
        style: GoogleFonts.pacifico(
            textStyle: TextStyle(
                color: Color.fromRGBO(147, 49, 97, 1.0), fontSize: 30)),
      ),
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(
              left: _leftAndRightPadding,
              right: _leftAndRightPadding,
              bottom: _bottomPadding),
          child: Text(
            section.description == null ? "" : section.description,
            style: GoogleFonts.montserrat(),
          ),
        ),
      ],
    );
  }

  Widget _buildTutoVideo(Section section) {
    //carouselTutoVideo
    if (section.videoLinkList != null) {
    List<int> imgList =
        List.generate(section.videoLinkList.length, (index) => index);
    final List<Widget> imageSliders = imgList
        .map((item) => GestureDetector(
      onTap: () async {
        String url = section.videoLinkList[item];
        if (await canLaunch(url)) {
        await launch(url);
        } else {
        throw 'Could not launch $url';
        }
      },
          child: Container(
                child: Container(
                  margin: EdgeInsets.all(5.0),
                  child: ClipRRect(
                      borderRadius: BorderRadius.all(Radius.circular(5.0)),
                      child: Stack(
                        children: <Widget>[
                          Image.asset(
                              "assets/images/placeholders/video_background.png",
                              fit: BoxFit.cover,
                              width: 1000.0),
                          Positioned(
                            bottom: 0.0,
                            left: 0.0,
                            right: 0.0,
                            child: Container(
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [
                                    Color.fromARGB(200, 0, 0, 0),
                                    Color.fromARGB(0, 0, 0, 0)
                                  ],
                                  begin: Alignment.bottomCenter,
                                  end: Alignment.topCenter,
                                ),
                              ),
                              padding: EdgeInsets.symmetric(
                                  vertical: 10.0, horizontal: 20.0),
                              child: Text(section.videoTitleList[item].toString(),
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20.0,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      )),
                ),
              ),
        ))
        .toList();
    return ExpansionTile(
      title: Text(section.title == null ? "" : section.title,
          style: GoogleFonts.pacifico(
              textStyle: TextStyle(
                  color: Color.fromRGBO(147, 49, 97, 1.0),
                  fontSize: 30))),
      children: <Widget>[
        CarouselSlider(
          options: CarouselOptions(
            autoPlay: true,
            aspectRatio: 2.0,
            enlargeCenterPage: true,
          ),
          items: imageSliders,
        )
      ],
    );}
    else {
      return CircularProgressIndicator();
    }

  }

  Widget _buildImageWithTitle(Section section) {
    return section.imageLink == null
        ? CircularProgressIndicator()
        : ExpansionTile(
            title: Text(section.title == null ? "" : section.title,
                style: GoogleFonts.pacifico(
                    textStyle: TextStyle(
                        color: Color.fromRGBO(147, 49, 97, 1.0),
                        fontSize: 30))),
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(
                    left: _leftAndRightPadding,
                    right: _leftAndRightPadding,
                    bottom: _bottomPadding),
                child: isAssetImage(section.imageLink),
              )
            ],
          );
  }

  Widget _buildInterractivTuto(BuildContext context, Section section) {
    return section.machine == null
        ? CircularProgressIndicator()
        : Padding(
            padding: EdgeInsets.symmetric(horizontal: _leftAndRightPadding),
            child: RaisedButton(
              color: Color.fromRGBO(147, 49, 97, 1.0),
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(18.0)),
              onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => InterractivTuto(
                              machineName: machine.title,
                              machine: section.machine,
                            )));
              },
              child: Text(section.title == null ? "" : section.title,
                  style: TextStyle(color: Colors.white)),
            ),
          );
  }

  getSliverBackground() {
    if (this.machine.image.startsWith("htt") || this.machine.image.startsWith('/uploads')) {
      if(this.machine.image.startsWith('/uploads'))
        return Image.network(globalApiPrefix + this.machine.image,
            fit: BoxFit.cover,
            color: Color.fromRGBO(0, 0, 0, 0.4),
            colorBlendMode: BlendMode.darken);
      else
        return Image.network(this.machine.image,
            fit: BoxFit.cover,
            color: Color.fromRGBO(0, 0, 0, 0.4),
            colorBlendMode: BlendMode.darken);
    } else
      return Image.asset("assets/images/placeholders/machines.jpg",
          fit: BoxFit.cover,
          color: Color.fromRGBO(0, 0, 0, 0.4),
          colorBlendMode: BlendMode.darken);
  }

  isAssetImage(image) {
    if (image != null) {
      if (image.startsWith("assets"))
        return Image.asset(image, fit: BoxFit.cover);
      else
        return GestureDetector(
          onTap: () {
            print(DotEnv().env['BASE_API_URL']+image);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => ZoomableImage(
                          image: DotEnv().env['BASE_API_URL']+image,
                        )));
          },
          child: Container(
              height: 300,
              child: Image(image: CachedNetworkImageProvider(DotEnv().env['BASE_API_URL']+image))),
        );
    }
  }
}
