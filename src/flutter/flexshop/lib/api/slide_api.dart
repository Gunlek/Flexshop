import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SlideAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, workshop API => /workshops
  static var localApiPrefix = "/slides";

  /// Gets the list of all slides found in database
  /// and calls onDone when request has ended
  static getAllSlides({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson;
    if(response.statusCode == 200)
      decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets all slides associated to a machine
  /// id and calls onDone when request has ended
  static getSlidesByMachineId({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/machine/" + id.toString();
    var response = await http.get(url);
    var decodedJson;
    if(response.statusCode == 200)
      decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }


}