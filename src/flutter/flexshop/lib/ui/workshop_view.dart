import 'dart:ui';

import 'package:flexshop/model/workshop.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flexshop/model/category.dart';
import 'package:flexshop/model/machine.dart';

class WorkshopView extends StatelessWidget {
  final double _spaceBetweenTwoCategory = 40;
  final List<String> lCategory = ['Fraisage', 'Tournage', 'Perçage'];
  final List<List<String>> lMachine = [
    [
      '5 axes Lemoine',
      '4 axes',
      'Huron',
      'mjjk',
      'jkjnh',
      'jkhuhul',
      'jklbkbhl'
    ],
    ['Tour Ernault Somua', 'Tour Cazeneuve'],
    ['Perceuse à colonne']
  ];

  final Workshop workshop;

  WorkshopView({this.workshop});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        extendBody: true,
        bottomNavigationBar: BottomAppBar(
            color: Color.fromRGBO(33, 33, 33, 1.0),
            shape: CircularNotchedRectangle(),
            notchMargin: 7.0,
            child: SizedBox(
              height: 45,
            )),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        floatingActionButton: FloatingActionButton(
          onPressed: () => {}, // TODO: Add QR code scan
          child: FaIcon(FontAwesomeIcons.qrcode),
        ),
        body: Stack(
          children: <Widget>[
            Container(
              height: MediaQuery.of(context).size.height / 3,
              child: Image.asset(workshop.image, fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.5), colorBlendMode: BlendMode.darken)
            ),
            Container(
              height: MediaQuery.of(context).size.height / 5,
              child: Padding(
                padding: EdgeInsets.only(left: 20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      workshop.title.toUpperCase(),
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 50,
                        fontWeight: FontWeight.bold
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Column(
              children: <Widget>[
                SizedBox(height: MediaQuery.of(context).size.height / 5),
                Container(
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(238, 238, 238, 1.0),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(MediaQuery.of(context).size.width / 6)
                    ),
                  ),
                  width: MediaQuery.of(context).size.width,
                  height: MediaQuery.of(context).size.height * 3 / 4,
                  child: ClipRRect(
                    borderRadius: BorderRadius.only(topLeft: Radius.circular(MediaQuery.of(context).size.width / 6)),
                    child: SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.only(left: 30.0),
                        child: Column(
                          children: <Widget>[
                            SizedBox(height: 30,),
                            for(Category category in categories)
                               _buildCategory(context, category),
                            SizedBox(height: 80),
                          ],
                        ),
                      ),
                    ),
                  )
                ),
              ],
            ),
          ],
        ));
  }

  Widget _buildCategory(BuildContext context, Category category) {
    List<Machine> categoryMachines = machines.where((mach) => mach.category == category.id).toList();

    return Column(
      children: <Widget>[
        Align(
            alignment: Alignment.topLeft,
            child: Container(
              width: MediaQuery.of(context).size.width / 2,
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(
                  color: Color.fromRGBO(112, 112, 112, 1.0),
                  width: 2.0,
                ))
              ),
              child: Text(
                category.title,
                style: TextStyle(fontSize: 30),
              ),
            )),
        SizedBox(
          height: 20,
        ),
        Container(
          height: 100,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: categoryMachines.length,
            itemBuilder: (BuildContext context, int i) {
              return GestureDetector(
                onTap: () => {},     // TODO: Open machine detail
                child: Padding(
                  padding: EdgeInsets.only(right: 20),
                  child: Container(
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(10)), border: Border.all(width: 1, color: Color.fromRGBO(112, 112, 122, 1.0))),
                    width: MediaQuery.of(context).size.width / 3,
                    child: Stack(
                      fit: StackFit.expand,
                      children: <Widget>[
                        ClipRRect(
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                          child: Image.asset(categoryMachines[i].image, fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.5), colorBlendMode: BlendMode.darken,),
                        ),
                        Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: <Widget>[
                            Text(categoryMachines[i].title, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                            Text(categoryMachines[i].brand, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                            Text(categoryMachines[i].reference, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                          ],
                        )
                      ],
                    )
                  ),
                )
              );
            }
          ),
        ),
        SizedBox(height: _spaceBetweenTwoCategory),
      ],
    );
  }
}
