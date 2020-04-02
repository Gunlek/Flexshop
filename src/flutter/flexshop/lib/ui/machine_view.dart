import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_multi_carousel/carousel.dart';
import 'package:flexshop/model/section.dart';
import 'package:flexshop/ui/interractivTuto_view.dart';

class MachineView extends StatelessWidget {
  final List<Section> _sections = sections;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
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
                  title: Text('VR-8',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 40,
                      )),
                  background: Image.asset("assets/images/haas_illustration.jpg",
                      fit: BoxFit.cover,
                      color: Color.fromRGBO(0, 0, 0, 0.4),
                      colorBlendMode: BlendMode.darken)),
            ),
            new SliverList(delegate: new SliverChildListDelegate(_buildList(context))),
          ],
        ),
      ),
    );
  }
/*
  List _buildList(int count) {
    List<Widget> listItems = List();

    for (int i = 0; i < count; i++) {
      listItems.add(new Padding(padding: new EdgeInsets.all(20.0),
          child: new Text(
              'Item ${i.toString()}',
              style: new TextStyle(fontSize: 25.0)
          )
      ));
    }

    return listItems;
  }*/

  List<Widget> _buildList(BuildContext context) {
    List<Widget> widgetList = List<Widget>();
    for (int i = 0; i < _sections.length; i++) {
      switch (_sections[i].type) {
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

        case "carouselTutoVideo":
          {
            widgetList.add(_buildTutoVideo(_sections[i]));
          }
          break;

        case "imageWithTitle":
          {
            widgetList.add(_buildImageWithTitle(_sections[i]));
          }
          break;

        case "interractivTuto":
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

  Widget _buildPictos(Section section) {
    return Container(
      height: 50,
      child: ListView.builder(
          scrollDirection: Axis.horizontal,
          shrinkWrap: true,
          itemCount: section.pictosLinkList.length,
          itemBuilder: (BuildContext context, int i) {
            return Container(
                height: 50,
                width: 50,
                child: Image.asset(section.pictosLinkList[i]));
          }),
    );
  }

  Widget _buildDescriptionTile(Section section) {
    return ExpansionTile(
      title: Text(
        section.title,
        style: GoogleFonts.pacifico(
            textStyle: TextStyle(
                color: Color.fromRGBO(147, 49, 97, 1.0), fontSize: 30)),
      ),
      children: <Widget>[
        Text(
          section.description,
          style: GoogleFonts.montserrat(),
        ),
      ],
    );
  }

  Widget _buildTutoVideo(Section section){ //carouselTutoVideo
    return ExpansionTile(
      title: Text(section.title, style: GoogleFonts.pacifico(textStyle: TextStyle(
          color: Color.fromRGBO(147, 49, 97, 1.0),
          fontSize: 30
      ))),
      children: <Widget>[
        Carousel(
            height: 350.0,
            width: 350,
            initialPage: 3,
            allowWrap: false,
            type: Types.slideSwiper,
            onCarouselTap: (i) {
              print("onTap $i");
            },
            indicatorType: IndicatorTypes.bar,
            arrowColor: Colors.black,
            axis: Axis.horizontal,
            showArrow: true,
            children: List.generate(
                7,
                    (i) => Center(
                  child:
                  Container(color: Colors.red.withOpacity((i + 1) / 7)),
                ))),
      ],
    );
  }

  Widget _buildImageWithTitle(Section section){
    return             ExpansionTile(
      title: Text(section.title, style: GoogleFonts.pacifico(textStyle: TextStyle(
          color: Color.fromRGBO(147, 49, 97, 1.0),
          fontSize: 30
      ))),
      children: <Widget>[
        Image.asset(section.imageLink, fit: BoxFit.cover)
      ],
    );
  }

  Widget _buildInterractivTuto(BuildContext context, Section section){
    return RaisedButton(
      color: Color.fromRGBO(147, 49, 97, 1.0),
      shape: RoundedRectangleBorder(
          borderRadius: new BorderRadius.circular(18.0)
      ),
      onPressed: () {
        //TODO: add parameter of the route
        Navigator.push(context, MaterialPageRoute(builder: (context) => InterractivTuto(slideNumber: 0, machine: section.machine,)));
      },
      child: Text(section.title, style: TextStyle(color: Color.fromRGBO(255, 168, 14, 1.0)),),
    );
  }
}
