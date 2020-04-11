import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class WorkshopAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, workshop API => /workshops
  static var localApiPrefix = "/workshops";

  /// Gets the list of all workshops found in database
  /// and calls onDone when request has ended
  static getAllWorkshops({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson = null;
    if(response.statusCode == 200)
      decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific workshop from the provided
  /// id and calls onDone when request has ended
  static getWorkshopById({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/" + id.toString();
    var response = await http.get(url);
    var decodedJson = null;
    if(response.statusCode == 200)
      decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Adds a new workshop from the provided data
  /// and calls onDone when everything has been done
  static addWorkshop({Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/add";
    var response = await http.post(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Updates a workshop based on the provided id
  /// and provided data to update
  /// Calls onDone when everything is done
  static updateWorkshop({int id, Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/update/" + id.toString();
    var response = await http.put(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Deletes a workshop using the provided id
  /// Calls onDone when everyhting has been done
  static deleteWorkshop({int id, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/delete/" + id.toString();
    var response = await http.delete(url);
    if(onDone != null)onDone(response.statusCode);
  }

}