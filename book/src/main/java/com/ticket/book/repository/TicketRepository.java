package com.ticket.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticket.book.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

	List<Ticket> findBySubjectIgnoreCase(String subject);
    
}

