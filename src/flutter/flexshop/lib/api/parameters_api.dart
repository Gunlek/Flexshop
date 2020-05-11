import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ParametersAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, sections API => /sections
  static var localApiPrefix = "/parameters";

  /// Gets the list of all sections found in database
  /// and calls onDone when request has ended
  static getAllParameters({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific section from the provided
  /// id and calls onDone when request has ended
  static getParameterById({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/" + id.toString();
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific section from the provided
  /// id and calls onDone when request has ended
  static getParametersBySectionId({int id, Function(int, dynamic) onDone}) async{
    getAllParameters(
      onDone: (status, params){
        var paramsList = [];
        for(var param in params){
          if(param['parameter_section'] == id){
            if(param['parameter_name'].toString().toLowerCase().contains('list'))
              param['parameter_value'] = param['parameter_value'].toString().split(';');
            print("value");
            paramsList.add(param);
          }
        }
        if(onDone != null)onDone(status, paramsList);
    });
  }

  /// Adds a new section from the provided data
  /// and calls onDone when everything has been done
  static addParameter({Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/add";
    var response = await http.post(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Updates a section based on the provided id
  /// and provided data to update
  /// Calls onDone when everything is done
  static updateParameter({int id, Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/update/" + id.toString();
    var response = await http.put(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Deletes a section using the provided id
  /// Calls onDone when everyhting has been done
  static deleteParameter({int id, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/delete/" + id.toString();
    var response = await http.delete(url);
    if(onDone != null)onDone(response.statusCode);
  }

}