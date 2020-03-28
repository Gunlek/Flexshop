import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class MachineView extends StatelessWidget {
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
                  }
              ),
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
                  background: Image.asset("images/haas_illustration.jpg", fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.4), colorBlendMode: BlendMode.darken)
              ),
            ),
            new SliverList(
                delegate: new SliverChildListDelegate(_buildList())
            ),
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

  List<Widget> _buildList() {
    return [
      Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: <Widget>[
            RaisedButton(
              color: Color.fromRGBO(147, 49, 97, 1.0),
              shape: RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(18.0)
              ),
              onPressed: () {},
              child: Text("Démarrer le tuto interractif 4.0", style: TextStyle(color: Color.fromRGBO(255, 168, 14, 1.0)),),
            ),
            Text('Pictogramme danger'),
            Container(
              height: 50,
              child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  shrinkWrap: true,
                  itemCount: 15,
                  itemBuilder: (BuildContext context, int i){
                    return Container(
                        height: 50,
                        width: 50,
                        child: Image.asset('images/picto_gloves.png'));
                  }),
            ),
            ExpansionTile(
              title: Text('Risques', style: GoogleFonts.pacifico(textStyle: TextStyle(
                  color: Color.fromRGBO(147, 49, 97, 1.0),
                  fontSize: 30
              )),),
              children: <Widget>[
                Text("""
    -	Coupure des membres supérieurs avec les pièces non ébavurées ou les outils coupants 
    -	Chute d’objet sur membres inférieurs
    -	Projection de liquide de coupe dans les yeux lors du nettoyage
    -	Ejection de la pièce si dispositif de bridage inapproprié
    -	Collisions à grande vitesse entre les parties mobiles""", style: GoogleFonts.montserrat(),),
              ],
            ),
            Text('Caroussel tuto video'),
            Text('Vitesse de coupe'),
            ExpansionTile(
              title: Text("Vitesse de coupe", style: GoogleFonts.pacifico(textStyle: TextStyle(
                  color: Color.fromRGBO(147, 49, 97, 1.0),
                  fontSize: 30
              ))),
              children: <Widget>[
                Image.asset("images/tab_speed.jpg", fit: BoxFit.cover)
              ],
            ),
            Text('Exemples de réalisations')

          ],
        ),
      ),



    ];
  }
}