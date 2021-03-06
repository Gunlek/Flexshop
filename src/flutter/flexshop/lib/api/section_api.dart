import 'package:flexshop/api/parameters_api.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SectionAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, sections API => /sections
  static var localApiPrefix = "/sections";

  /// Gets the list of all sections found in database
  /// and calls onDone when request has ended
  static getAllSections({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific section from the provided
  /// id and calls onDone when request has ended
  static getSectionById({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/" + id.toString();
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Adds a new section from the provided data
  /// and calls onDone when everything has been done
  static addSection({Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/add";
    var response = await http.post(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Updates a section based on the provided id
  /// and provided data to update
  /// Calls onDone when everything is done
  static updateSection({int id, Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/update/" + id.toString();
    var response = await http.put(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Deletes a section using the provided id
  /// Calls onDone when everyhting has been done
  static deleteSection({int id, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/delete/" + id.toString();
    var response = await http.delete(url);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Get all sections for a specific machine id
  /// Calls onDone when everything has been done
  static getSectionForMachineId({int id, Function(dynamic) onDone}) async{
    getAllSections(
      onDone: (status, data){
        var machineSections = data.where((section) => section['section_machine'] == id).toList();
        for(var k=0;k<machineSections.length;k++){
          var section = machineSections[k];
          ParametersAPI.getParametersBySectionId(
            id: section['section_id'],
            onDone: (status, parameters){
              for(var param in parameters){
                machineSections[k][param['parameter_name']] = param['parameter_value'];
              }
              onDone(machineSections);
            }
          );
        }
      }
    );
  }

}