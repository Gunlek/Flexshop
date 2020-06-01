import 'package:flexshop/model/machine.dart';
import 'package:flexshop/ui/machine_view.dart';
import 'package:flutter/material.dart';

class MachineWidget extends StatefulWidget {

  Machine machine;
  MachineWidget(this.machine);

  @override
  _MachineWidgetState createState() => _MachineWidgetState(machine);
}

class _MachineWidgetState extends State<MachineWidget> {

  Machine machine;
  _MachineWidgetState(this.machine);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => {Navigator.push(context, MaterialPageRoute(builder: (context) => MachineView(machine: machine)))},     // TODO: Open machine detail
      child: Padding(
        padding: EdgeInsets.only(right: 20),
        child: Container(
          decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(10))),
          width: MediaQuery.of(context).size.width / 3,
          child: Stack(
            fit: StackFit.expand,
            children: <Widget>[
              ClipRRect(
                borderRadius: BorderRadius.all(Radius.circular(10)),
                child: isNetworkImageAvailable(
                  image: machine.image,
                  placeholder: "assets/images/placeholders/machines.jpg")
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(machine.title, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                  Text(machine.brand, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                  Text(machine.reference, textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: MediaQuery.of(context).textScaleFactor * 20)),
                ],
              )
            ],
          )
        ),
      )
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
        image,
        fit: BoxFit.cover, color: Color.fromRGBO(0, 0, 0, 0.5), colorBlendMode: BlendMode.darken
      );
  }
}