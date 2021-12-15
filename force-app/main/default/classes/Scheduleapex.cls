public class Scheduleapex implements schedulable {
    public void execute(SchedulableContext sc){
        list<contact> accs=[select id,lastname from contact where createddate=TODAY];
        delete accs;
    }
}
// Code to schedule Apex Class