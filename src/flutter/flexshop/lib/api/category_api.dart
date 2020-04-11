import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class CategoryAPI {

  static var globalApiPrefix = DotEnv().env['BASE_API_URL'];

  // Describes the local entry point
  // Here, category API => /category
  static var localApiPrefix = "/category";

  /// Gets the list of all categories found in database
  /// and calls onDone when request has ended
  static getAllCategories({Function(int, dynamic) onDone}) async {
    var url = globalApiPrefix + localApiPrefix + "/list";
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Gets a specific category from the provided
  /// id and calls onDone when request has ended
  static getWorkshopById({int id, Function(int, dynamic) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/get/" + id.toString();
    var response = await http.get(url);
    var decodedJson = json.decode(response.body);
    if(onDone != null)onDone(response.statusCode, decodedJson);
  }

  /// Adds a new category from the provided data
  /// and calls onDone when everything has been done
  static addCategory({Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/add";
    var response = await http.post(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Updates a category based on the provided id
  /// and provided data to update
  /// Calls onDone when everything is done
  static updateCategory({int id, Map data, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/update/" + id.toString();
    var response = await http.put(url, body: data);
    if(onDone != null)onDone(response.statusCode);
  }

  /// Deletes a category using the provided id
  /// Calls onDone when everyhting has been done
  static deleteCategory({int id, Function(int) onDone}) async{
    var url = globalApiPrefix + localApiPrefix + "/delete/" + id.toString();
    var response = await http.delete(url);
    if(onDone != null)onDone(response.statusCode);
  }

}