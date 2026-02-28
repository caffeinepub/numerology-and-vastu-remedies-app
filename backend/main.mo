import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  module NumerologyReport {
    public func compare(report1 : NumerologyReport, report2 : NumerologyReport) : Order.Order {
      Text.compare(report1.userName, report2.userName);
    };
  };

  module VastuRemedy {
    public func compare(remedy1 : VastuRemedy, remedy2 : VastuRemedy) : Order.Order {
      Text.compare(remedy1.userName, remedy2.userName);
    };
  };

  module ConsultationBooking {
    public func compare(booking1 : ConsultationBooking, booking2 : ConsultationBooking) : Order.Order {
      Text.compare(booking1.userName, booking2.userName);
    };
  };

  module AvailableSlot {
    public func compare(slot1 : AvailableSlot, slot2 : AvailableSlot) : Order.Order {
      if (slot1.timestamp < slot2.timestamp) { return #less };
      if (slot1.timestamp > slot2.timestamp) { return #greater };
      Text.compare(slot1.timeRange, slot2.timeRange);
    };
  };

  type NumerologyReport = {
    userName : Text;
    birthDate : Text;
    lifePathNumber : Nat;
    luckyNumbers : [Nat];
    favorableColors : [Text];
    careerRecommendations : [Text];
    relationshipGuidance : Text;
    birthChartAnalysis : Text;
  };

  type VastuRemedy = {
    userName : Text;
    numerologyNumber : Nat;
    vastuSuggestions : [Text];
    preferredDirections : [Text];
    remedyInstructions : Text;
  };

  type ConsultationBooking = {
    bookingId : Nat;
    userName : Text;
    contactNumber : Text;
    selectedTimeSlot : Text;
    bookingStatus : Text;
  };

  type AvailableSlot = {
    slotId : Nat;
    timeRange : Text;
    timestamp : Int;
    isAvailable : Bool;
  };

  let numerologyReports = Map.empty<Nat, NumerologyReport>();
  let vastuRemedies = Map.empty<Nat, VastuRemedy>();
  let consultationBookings = Map.empty<Nat, ConsultationBooking>();
  let availableSlots = Map.empty<Nat, AvailableSlot>();
  var nextBookingId = 1;
  var nextSlotId = 1;

  // Numerology Report Generation
  public shared ({ caller }) func generateNumerologyReport(userName : Text, birthDate : Text) : async NumerologyReport {
    let lifePathNumber = calculateLifePathNumber(birthDate);
    let luckyNumbers = [lifePathNumber, (lifePathNumber + 3) % 9, (lifePathNumber + 5) % 9];
    let favorableColors = ["Gold", "Blue", "Maroon"];
    let careerRecommendations = ["Business", "Teaching", "Creative Arts"];
    let relationshipGuidance = "Focus on open communication and understanding.";
    let birthChartAnalysis = "You have a strong individuality and leadership qualities.";

    let report : NumerologyReport = {
      userName;
      birthDate;
      lifePathNumber;
      luckyNumbers;
      favorableColors;
      careerRecommendations;
      relationshipGuidance;
      birthChartAnalysis;
    };

    numerologyReports.add(nextBookingId, report);
    nextBookingId += 1;
    report;
  };

  // Vastu Remedies Section
  public shared ({ caller }) func getVastuRemedies(userName : Text, numerologyNumber : Nat) : async VastuRemedy {
    let vastuSuggestions = [
      "Place your bed towards the north-east direction.",
      "Use calming colors in your living space.",
      "Keep the entrance area clutter-free."
    ];
    let preferredDirections = ["North-East", "East", "South-West"];
    let remedyInstructions = "Follow these suggestions to enhance positive energy in your home.";
    let remedy : VastuRemedy = {
      userName;
      numerologyNumber;
      vastuSuggestions;
      preferredDirections;
      remedyInstructions;
    };

    vastuRemedies.add(nextBookingId, remedy);
    nextBookingId += 1;
    remedy;
  };

  // Consultation Booking System
  public shared ({ caller }) func bookConsultation(userName : Text, contactNumber : Text, selectedTimeSlot : Text) : async ConsultationBooking {
    if (userName == "" or contactNumber == "" or selectedTimeSlot == "") {
      Runtime.trap("Invalid Booking Information. Please provide all required details. ");
    };

    let booking : ConsultationBooking = {
      bookingId = nextBookingId;
      userName;
      contactNumber;
      selectedTimeSlot;
      bookingStatus = "Booked";
    };

    consultationBookings.add(nextBookingId, booking);
    nextBookingId += 1;

    booking;
  };

  public shared ({ caller }) func addAvailableSlot(timeRange : Text) : async AvailableSlot {
    if (timeRange == "") { Runtime.trap("Invalid Time Range. Please provide a valid time range. ") };

    let slot : AvailableSlot = {
      slotId = nextSlotId;
      timeRange;
      timestamp = Time.now();
      isAvailable = true;
    };

    availableSlots.add(nextSlotId, slot);
    nextSlotId += 1;

    slot;
  };

  public query ({ caller }) func getAvailableTimeSlots() : async [AvailableSlot] {
    availableSlots.values().toArray().sort();
  };

  public query ({ caller }) func getAllBookings() : async [ConsultationBooking] {
    consultationBookings.values().toArray().sort();
  };

  public query ({ caller }) func getAllNumerologyReports() : async [NumerologyReport] {
    numerologyReports.values().toArray().sort();
  };

  public query ({ caller }) func getAllVastuRemedies() : async [VastuRemedy] {
    vastuRemedies.values().toArray().sort();
  };

  // Helper function to calculate life path number (simplified version)
  func calculateLifePathNumber(birthDate : Text) : Nat {
    let numbers = birthDate.toArray().filter(func(c) { c >= '0' and c <= '9' });
    var sum = numbers.size();
    while (sum > 9) {
      var temp = 0;
      let numIter = numbers.values();
      temp += 1;
      sum := temp;
    };
    sum;
  };
};
