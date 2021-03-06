import 'package:flexshop/ui/workshop_view.dart';
import 'package:flutter/material.dart';
import 'package:flexshop/model/workshop.dart';

class WorkshopWidget extends StatelessWidget {

  final Workshop workshop;

  final double widgetWidth = 60;    // In percent of mediaquery width
  final double widgetHeight = 150;  // In pixels

  WorkshopWidget({this.workshop});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: GestureDetector(
        onTap: () => {
          Navigator.push(context, MaterialPageRoute(builder: (context) => WorkshopView(workshop: workshop)))
        },
        child: Container(
          width: MediaQuery.of(context).size.width * widgetWidth / 100,
          height: widgetHeight,
          decoration: BoxDecoration(color: Color.fromRGBO(255, 255, 255, 1.0), borderRadius: BorderRadius.all(Radius.circular(16))),
          child: Stack(
            children: <Widget>[
              ClipRRect(
                borderRadius: BorderRadius.only(topLeft: Radius.circular(16), topRight: Radius.circular(16)),
                child: Container(
                  width: MediaQuery.of(context).size.width * widgetWidth / 100,
                  color: Color.fromRGBO(0, 0, 0, 0.5),
                  height: widgetHeight - 50,
                  child: Hero(
                    tag: workshop.id.toString(),
                    child: isNetworkImageAvailable(
                      image: workshop.image,
                      placeholder: "assets/images/placeholders/workshops.jpg"
                    )
                  ),
                ),
              ),
              Container(
                height: widgetHeight - 50,
                width: double.infinity,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: EdgeInsets.all(20),
                      child: Text(
                        this.workshop.title,
                        style: TextStyle(color: Color.fromRGBO(255, 255, 255, 1.0), fontWeight: FontWeight.bold, fontSize: MediaQuery.of(context).textScaleFactor * 30)
                      )
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget isNetworkImageAvailable({String image, String placeholder}) {
    if(!image.startsWith("http"))
      return Image.asset(
        placeholder,
        fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.5), colorBlendMode: BlendMode.darken
      );
    else
      return Image.network(
        workshop.image,
        fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.5), colorBlendMode: BlendMode.darken
      );
  }
}