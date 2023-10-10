package com.ticket.book.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "tickets")
public class Ticket {
	
	public Ticket() {
		
	}
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
    private Long id; 
    private String subject;
    private String employee;
    private String priority;
    private Date endDate;
    private String description;
    private String status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	@Override
	public String toString() {
		return "Ticket [subject=" + subject + ", employee=" + employee + ", priority=" + priority + ", description="
				+ description + ", status=" + status + "]";
	}
	public String getEmployee() {
		return employee;
	}
	public void setEmployee(String employee) {
		this.employee = employee;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Ticket(Long id, String subject, String employee, String priority, Date endDate, String description,
			String status) {
		super();
		this.id = id;
		this.subject = subject;
		this.employee = employee;
		this.priority = priority;
		this.endDate = endDate;
		this.description = description;
		this.status = status;
	}
}

