import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class MachineAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, machines API => /machines
  static var localApiPrefix = "/machines";

  /// Gets the list of all machines found in database
  /// and calls onDone when request has ended
  static getAllMachines({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific machine from the provided
  /// id and calls onDone when request has ended
  static getMachineFromId({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/" + id.toString();
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Adds a new machine from the provided data
  /// and calls onDone when everything has been done
  static addMachine({Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/add";
    var response = await http.post(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Updates a machine based on the provided id
  /// and provided data to update
  /// Calls onDone when everything is done
  static machineWorkshop({int id, Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/update/" + id.toString();
    var response = await http.put(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Deletes a machine using the provided id
  /// Calls onDone when everyhting has been done
  static deleteMachine({int id, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/delete/" + id.toString();
    var response = await http.delete(url);
    if(onDone != null)onDone(response.statusCode);
  }

}