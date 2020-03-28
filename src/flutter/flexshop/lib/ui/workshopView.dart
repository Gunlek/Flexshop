import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

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
          fit: StackFit.expand,
          children: <Widget>[
            Container(
              height: MediaQuery.of(context).size.height / 3,
              color: Colors.blueAccent,
            ),
            Positioned(
                top: MediaQuery.of(context).size.height / 9,
                left: 20,
                child: Text(
                  'Usinage'.toUpperCase(),
                  style: TextStyle(
                      color: Colors.white,
                    fontSize: 50,
                    fontWeight: FontWeight.bold
                  ),
                )),
            Positioned(
              top: MediaQuery.of(context).size.height / 4,
              child: Container(
                  decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(
                              MediaQuery.of(context).size.width / 6))),
                  width: MediaQuery.of(context).size.width,
                  //color: Colors.grey,
                  height: MediaQuery.of(context).size.height * 3 / 4,
                  child: Padding(
                    padding: const EdgeInsets.only(top: 30, left: 30),
                    child: SingleChildScrollView(
                        child: Column(
                      children: <Widget>[
                        //SizedBox(height: 30,),
                        _buildCategory(context, 0),
                        SizedBox(height: _spaceBetweenTwoCategory,),
                        _buildCategory(context, 1),
                        SizedBox(height: _spaceBetweenTwoCategory,),
                        _buildCategory(context, 2),
                        SizedBox(height: _spaceBetweenTwoCategory,),
                        _buildCategory(context, 0),
                        SizedBox(height: 80,)
                      ],
                    )),
                  )),
            )
          ],
        ));
  }

  Widget _buildCategory(BuildContext context, int i) {
    return Column(
      children: <Widget>[
        Align(
            alignment: Alignment.topLeft,
            child: Container(
              width: MediaQuery.of(context).size.width / 2,
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(
                  color: Colors.black,
                  width: 2.0,
                ))
              ),
              child: Text(
                lCategory[i],
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
              shrinkWrap: true,
              itemCount: lMachine[i].length,
              itemBuilder: (BuildContext context, int j) {
                return Container(
                  width: 100,
                  child: Card(
                      color: Colors.amber,
                      child: RawMaterialButton(child: Text(lMachine[i][j]))),
                );
              }),
        )
      ],
    );
  }
}
